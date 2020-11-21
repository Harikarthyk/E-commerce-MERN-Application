import React, { useContext, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import UserContext from '../context/UserContext';
import { addCategorytoDB } from '../helper/categories';

function AddCategory() {
	const [input, setInput] = useState({
		name: '',
		link: '',
	});
	const [output, setOutput] = useState({
		error: false,
		message: '',
	});
	const context = useContext(UserContext);
	const handleClick = () => {
		console.log(context.user._id, context.token, input);
		addCategorytoDB(context.user._id, context.token, input)
			.then((result) => {
				if (result.error) {
					setOutput({ ...output, error: true, message: result.error });
					return;
				}
				setOutput({ ...output, error: false, message: result.message });
			})
			.catch((error) => console.error(error));
	};
	const showResult = () => {
		return (
			<div className="result">
				{output.message.length > 0 ? (
					<div
						className="result__message"
						style={
							output.error
								? { backgroundColor: '#ea6c6c' }
								: { backgroundColor: '#8bc34a' }
						}
					>
						{output.message}
					</div>
				) : (
					''
				)}
			</div>
		);
	};
	return (
		<div className="addcategory">
			<div className="addcategory__field">
				<div className="addcategory__field__label">Category Name :</div>
				<input
					type="text"
					value={input.name}
					onChange={(e) => setInput({ ...input, name: e.target.value })}
				/>
			</div>
			<div className="addcategory__field">
				<div className="addcategory__field__label">Image url </div>
				<input
					type="text"
					value={input.link}
					onChange={(e) => setInput({ ...input, link: e.target.value })}
				/>
			</div>
			{showResult()}
			<div className="addcategory__submit">
				<button
					onClick={() => handleClick()}
					className="addcategory__submitbtn"
				>
					<FaPlusCircle />
				</button>
			</div>
		</div>
	);
}

export default AddCategory;
