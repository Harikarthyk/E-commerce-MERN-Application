import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import { isAuthenticated } from '../helper/auth';
import { fetchAllCategories } from '../helper/categories';
import { addProduct } from '../helper/product';

function AddProduct() {
	const [size, setSize] = useState([]);
	const [input, setInput] = useState({
		name: '',
		category: 0,
		photo: '',
		stock: '',
		price: '',
		description: '',
	});
	const [categories, setCategories] = useState([]);
	const [output, setOutput] = useState({
		error: false,
		message: '',
	});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchAllCategories().then((result) => {
			if (!result) return;
			if (result.error) {
				setOutput({ ...output, error: true, message: result.error });
				return;
			}
			setCategories(result.categories);
			// setInput({ ...input, formData: new FormData() });
		});
	});
	const handleClick = () => {
		let formData = new FormData();
		if (input.category === 0) {
			alert('Select Category');
			return;
		}
		setLoading(true);
		formData.set('name', input.name);
		formData.set('category', input.category);
		formData.set('photo', input.photo);
		formData.set('stock', input.stock);
		formData.set('price', input.price);
		formData.set('size', size);
		formData.set('description', input.description);
		let { user, token } = isAuthenticated();
		addProduct(formData, token, user._id).then((result) => {
			if (!result || result.error) {
				if (!result) return;
				setOutput({ ...output, error: true, message: result.error });
				return;
			}
			setOutput({ ...output, error: false, message: result.message });
			setInput({
				...input,
				name: '',
				photo: '',
				stock: '',
				price: '',
				description: '',
			});
			setLoading(false);
		});
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
		<div className="adminproduct">
			<div className="addcategory__field">
				<div className="addcategory__field__label">Product Name </div>
				<input
					type="text"
					onChange={(e) => {
						setInput({ ...input, name: e.target.value });
					}}
					value={input.name}
				/>
			</div>
			<div className="addcategory__field">
				<div className="addcategory__field__label">Select Category</div>
				<select
					onChange={(e) => {
						setInput({ ...input, category: e.target.value });
					}}
				>
					<option value={0}>select category</option>
					{categories.map((cate) => {
						return (
							<option key={cate._id} value={cate._id}>
								{cate.name}
							</option>
						);
					})}
				</select>
			</div>
			<div className="addcategory__field">
				<input
					onChange={(e) => setInput({ ...input, photo: e.target.files[0] })}
					type="file"
					accept="image"
					placeholder="choose a file"
				/>
			</div>
			<div className="addcategory__field">
				<div className="addcategory__field__label">Stock </div>
				<input
					onChange={(e) => setInput({ ...input, stock: e.target.value })}
					type="number"
					value={input.stock}
				/>
			</div>
			<div className="addcategory__field">
				<div className="addcategory__field__label">Price </div>
				<input
					onChange={(e) => setInput({ ...input, price: e.target.value })}
					type="number"
					value={input.price}
				/>
			</div>
			<div className="viewparticularproduct__sizes">
				Sizes
				<div
					className="viewparticularproduct__sizes__label"
					style={
						size.includes('S')
							? {
									color: 'white',
									background: '#131921',
									fontWeight: 'bolder',
									boxShadow: '-4px -1px 20px 0px',
							  }
							: {
									background: 'white',
							  }
					}
					onClick={() => {
						if (size.includes('S')) {
							let newSize = size.filter((s) => s !== 'S');
							setSize(newSize);
						} else {
							let newSize = size;
							newSize.push('S');
							setSize(newSize);
						}
					}}
				>
					S
				</div>
				<div
					className="viewparticularproduct__sizes__label"
					style={
						size.includes('M')
							? {
									color: 'white',
									background: '#131921',
									fontWeight: 'bolder',
									boxShadow: '-4px -1px 20px 0px',
							  }
							: {
									background: 'white',
							  }
					}
					onClick={() => {
						if (size.includes('M')) {
							let newSize = size.filter((s) => s !== 'M');
							setSize(newSize);
						} else {
							let newSize = size;
							newSize.push('M');
							setSize(newSize);
						}
					}}
				>
					M
				</div>
				<div
					className="viewparticularproduct__sizes__label"
					style={
						size.includes('L')
							? {
									color: 'white',
									background: '#131921',
									fontWeight: 'bolder',
									boxShadow: '-4px -1px 20px 0px',
							  }
							: {
									background: 'white',
							  }
					}
					onClick={() => {
						if (size.includes('L')) {
							let newSize = size.filter((s) => s !== 'L');
							setSize(newSize);
						} else {
							let newSize = size;
							newSize.push('L');
							setSize(newSize);
						}
					}}
				>
					L
				</div>
			</div>
			<div className="addcategory__field">
				<div className="addcategory__field__label">Description </div>
				<textarea
					onChange={(e) => setInput({ ...input, description: e.target.value })}
					value={input.description}
				/>
			</div>
			{showResult()}
			{loading ? (
				<div className="loading">
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				</div>
			) : (
				''
			)}
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

export default AddProduct;
