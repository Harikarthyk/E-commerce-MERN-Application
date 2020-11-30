import React, {useContext, useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import {Link, Redirect, useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';
import {isAuthenticated} from '../helper/auth';
import {getOrderByUserId} from '../helper/order';
import './Order.css';

function Order() {
	const history = useHistory();
	const context = useContext(UserContext);
	const [order, setOrder] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let userId = history.location.pathname.split('/')[2];
		const {token} = isAuthenticated();
		getOrderByUserId(userId, token)
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					return;
				}
				setLoading(false);
				setOrder(result.orders);
			})
			.catch((error) => console.error(error));
	}, []);
	const API = 'https://e-commerce-clothings.herokuapp.com/api';

	const ImageHelper = ({product}) => {
		const imageurl = product
			? `${API}/product/photo/${product._id}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div
				style={{
					width: '95px',
					marginRight: ' 12px',
				}}
				className='viewallorder__img__wrapper'
			>
				<img src={imageurl} alt={product._id} />
			</div>
		);
	};
	const {user} = isAuthenticated();
	if (!user || history.location.pathname.split('/')[2] !== user._id)
		return <Redirect to='/' />;
	return (
		<div
			onClick={() => {
				context.setShowDropDown(false);
			}}
			className='order'
		>
			<div className='order__title'>
				<Link
					to='/'
					style={{
						marginRight: ' 10px',
						textDecoration: 'none !important',
						cursor: 'pointer',
						fontWeight: '600 !important',
						background: '#131921',
						padding: '10px',
						color: 'white',
						fontSize: '15px',
						borderRadius: '13px',
					}}
				>
					Go back
				</Link>
				Your Orders
			</div>
			{loading ? (
				<div className='loading'>
					<Loader type='Oval' color='#00BFFF' height={50} width={50} />
				</div>
			) : (
				''
			)}
			{order.length === 0 && !loading ? (
				<div className='order__empty'>Not orderd Anything : ( </div>
			) : (
				<div className='order__body'>
					{order.map((o) => {
						return (
							<div key={o._id} className='order__body__order'>
								<div className='order__body__order__id'>
									Invoice Number : {o._id}
								</div>
								<div className='order__body__order__product__title'>
									Products :
								</div>
								<div className='order__body__order__product'>
									{o.products.map((product) => {
										return (
											<div className='order__body__order__product__item'>
												<ImageHelper product={product.product} />

												<div className='order__body__order__product__main'>
													<div className='order__body__order__product__item__name'>
														{product.product.name}{' '}
													</div>
													<div className='order__body__order__product__item__price'>
														Price : {product.product.price}{' '}
													</div>
													<div className='order__body__order__product__item__count'>
														Count : {product.count}{' '}
													</div>
													<div className='order__body__order__product__item__size'>
														Size : {product.size}{' '}
													</div>
												</div>
											</div>
										);
									})}
									<div className='order__body__order__product__total'>
										Total : Rs.{o.total}
									</div>
									<div
										className='order__body__order__product__status'
										style={
											o.status === 'Pending'
												? {backgroundColor: '#b77474'}
												: {backgroundColor: '#8bc34a'}
										}
									>
										{o.status}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default Order;
