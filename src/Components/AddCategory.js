import React, {useContext, useState} from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import UserContext from '../context/UserContext';
import {addCategorytoDB} from '../helper/categories';

function AddCategory() {
	const [input, setInput] = useState({
		name: '',
		link: '',
	});
	const [output, setOutput] = useState({
		error: false,
		message: '',
	});

	const [loading, setLoading] = useState(false);
	const context = useContext(UserContext);
	const handleClick = () => {
		setLoading(true);
		addCategorytoDB(context.user._id, context.token, input)
			.then((result) => {
				if (result.error) {
					setOutput({...output, error: true, message: result.error});
					return;
				}
				setOutput({...output, error: false, message: result.message});
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};
	const showResult = () => {
		return (
			<div className='result'>
				{output.message.length > 0 ? (
					<div
						className='result__message'
						style={
							output.error
								? {backgroundColor: '#ea6c6c'}
								: {backgroundColor: '#8bc34a'}
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
		<div
			onClick={() => {
				context.setShowDropDown(false);
			}}
			className='addcategory'
		>
			{loading ? (
				<div className='loading'>
					<Loader type='Oval' color='#00BFFF' height={50} width={50} />
				</div>
			) : (
				''
			)}
			<div className='addcategory__field'>
				<div className='addcategory__field__label'>Category Name :</div>
				<input
					type='text'
					value={input.name}
					onChange={(e) => setInput({...input, name: e.target.value})}
				/>
			</div>
			<div className='addcategory__field'>
				<div className='addcategory__field__label'>Image url </div>
				<input
					type='text'
					value={input.link}
					onChange={(e) => setInput({...input, link: e.target.value})}
				/>
			</div>
			{showResult()}
			<div className='addcategory__submit'>
				<button
					onClick={() => handleClick()}
					className='addcategory__submitbtn'
				>
					<FaPlusCircle />
				</button>
			</div>
		</div>
	);
}

export default AddCategory;
