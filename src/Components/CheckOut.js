import React, {useContext, useEffect, useState} from 'react';
import {FaLock, FaTrash} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import UserContext from '../context/UserContext';
import './CheckOut.css';
function CheckOut() {
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);
	const context = useContext(UserContext);
	useEffect(() => {
		let result = 0;
		cart.forEach((c) => (result += Number(c.price) * Number(c.count)));
		setTotal(result);
	}, [cart]);
	useEffect(() => {
		if (!localStorage.getItem('cart')) {
			localStorage.setItem('cart', JSON.stringify([]));
		}
		let newCart = JSON.parse(localStorage.getItem('cart'));
		setCart(newCart);
	}, []);
	const API = 'https://e-commerce-clothings.herokuapp.com/api';

	const ImageHelper = ({product}) => {
		const imageurl = product
			? `${API}/product/photo/${product.product}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div className='checkout__img__wrapper'>
				<img src={imageurl} alt={product._id} />
			</div>
		);
	};
	const handleClick = (product) => {
		context.setClick(!context.click);
		let newCart = cart.filter((c) => c.product !== product.product);
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};
	return (
		<div
			className='checkout'
			onClick={() => {
				context.setShowDropDown(false);
			}}
		>
			<div className='checkout__header'>
				<div className='checkout__title'>Shopping Cart</div>
				<Link to='/' className='checkout__back'>
					Continue Shopping
				</Link>
			</div>
			<div className='checkout__body'>
				<div className='checkout__body__title'>Order Summary</div>

				<div className='checkout__body__wrapper'>
					<div className='checkout__body__leftside'>
						{cart.length === 0 ? (
							<div className='checkout__body__leftside__empty'>
								Your Cart is empty : (
							</div>
						) : (
							''
						)}
						{cart.map((c, index) => {
							return (
								<div key={c._id} className='checkout__body__cartitem'>
									<ImageHelper product={c} />
									<div className='checkout__body__cartitem__subtab'>
										<div className='checkout__body__cartitem__name'>
											{c.name}
										</div>
										<div className='checkout__body__cartitem__price'>
											Rs. <b>{c.price}</b>
										</div>
										<div className='checkout__body__cartitem__count'>
											Count <b>{c.count}</b>
										</div>
										<div
											onClick={() => handleClick(c)}
											className='checkout__body__cartitem__delete'
										>
											<FaTrash />
										</div>
									</div>
								</div>
							);
						})}
					</div>
					{cart.length >= 1 ? (
						<div className='checkout__cartitem__rightside'>
							<div className='checkout__cartitem__total'>
								Your Cart Total Rs. {total}
							</div>
							<Link
								to='/checkout/buy'
								className='checkout__cartitem__total__button'
							>
								<FaLock style={{marginRight: '10px'}} /> Proceed to checkout
							</Link>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
}

export default CheckOut;
