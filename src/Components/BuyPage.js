import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from '../helper/auth';
import {placeOrder} from '../helper/order';
import Loader from 'react-loader-spinner';

import './BuyPage.css';
import UserContext from '../context/UserContext';
function BuyPage() {
	const {user, token} = isAuthenticated();
	const context = useContext(UserContext);
	const [input, setInput] = useState({
		name: '',
		state: 'Tamil Nadu',
		district: 'Coimbatore',
		street: '',
		pincode: '',
		products: [],
		phoneNo: '',
		total: '',
	});
	const [output, setOutput] = useState({
		error: false,
		message: '',
	});
	const [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	useEffect(() => {
		let cartItem = JSON.parse(localStorage.getItem('cart'));
		if (cartItem.length === 0) setRedirect(true);
		if (isAuthenticated()) {
			let sum = 0;
			cartItem.forEach((c) => (sum += Number(c.price) * Number(c.count)));
			setInput({
				...input,
				name: user.name,
				phoneNo: user.phoneNo,
				products: cartItem,
				total: sum,
			});
		}
	}, []);
	const handleClick = () => {
		setLoading(true);
		placeOrder(user._id, token, {
			total: input.total,
			user: user._id,
			street: input.street,
			state: input.state,
			district: input.district,
			phoneNo: input.phoneNo,
			products: input.products,
		})
			.then((result) => {
				if (result.error) {
					setOutput({...output, error: true, message: result.error});
					console.error(result.error);
					return;
				}
				setRedirect(true);
				setOutput({...output, error: false, message: result.message});
				setLoading(false);
				localStorage.setItem('cart', JSON.stringify([]));
				context.setClick(!context.click);
			})
			.catch((error) => console.error(error));
	};
	const showResult = () => {
		return (
			<div
				onClick={() => {
					context.setShowDropDown(false);
				}}
				className='result'
			>
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
	if (redirect) return <Redirect to={`/orders/${user._id}`} />;
	if (!isAuthenticated()) return <Redirect to='/login' />;

	return (
		<div className='buypage'>
			<div className='buypage__header'>Fill the details</div>
			{showResult()}
			<div className='buypage__body'>
				<div className='buypage__body__left'>
					<div className='buypage__body__field'>
						<div className='buypage__body__field__label'>Name</div>
						<input
							type='text'
							className='buypage__body__field__input'
							value={input.name}
							onChange={(e) => {
								setInput({...input, name: e.target.value});
							}}
						/>
					</div>
					<div className='buypage__body__field'>
						<div className='buypage__body__field__label'>Phone Number</div>
						<input
							type='text'
							value={input.phoneNo}
							className='buypage__body__field__input'
							onChange={(e) => {
								setInput({...input, phoneNo: e.target.value});
							}}
						/>
					</div>
					<div className='buypage__body__field__note'>
						Note : Only Applicable in Coimbatore, TamilNadu , India
					</div>
					<div className='buypage__body__field'>
						<div className='buypage__body__field__label'>Street</div>
						<textarea
							className='buypage__body__field__textarea'
							value={input.street}
							onChange={(e) => {
								setInput({...input, street: e.target.value});
							}}
						/>
					</div>
					<div className='buypage__body__field'>
						<div className='buypage__body__field__label'>Pincode</div>
						<input
							className='buypage__body__field__input'
							value={input.pincode}
							type='text'
							onChange={(e) => {
								setInput({...input, pincode: e.target.value});
							}}
						/>
					</div>
					<div className='buypage__body__field__note'>
						Cash on Delivery (COD) is only Available
					</div>
				</div>
				{loading ? (
					<div className='loading'>
						<Loader type='Oval' color='#00BFFF' height={50} width={50} />
					</div>
				) : (
					''
				)}

				<div className='buypage__body__right'>
					<div className='buypage__body__total'>
						Total Amount Rs.{input.total}
					</div>
					<button
						disabled={
							!input.name ||
							!input.state ||
							!input.district ||
							!input.street ||
							!input.pincode ||
							!input.phoneNo
						}
						className='buypage__body__right'
						onClick={() => handleClick()}
					>
						Place Order
					</button>
				</div>
			</div>
		</div>
	);
}

export default BuyPage;
