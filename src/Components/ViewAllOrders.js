import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import UserContext from '../context/UserContext';
import {isAuthenticated} from '../helper/auth';
import {getAllOrderAdmin, updateOrderStatus} from '../helper/order';

function ViewAllOrders() {
	let {user, token} = isAuthenticated();
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		updateOrder();
	}, []);
	const context = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const updateOrder = () => {
		setLoading(true);

		getAllOrderAdmin(user._id, token)
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					return;
				}
				setLoading(false);
				setOrders(result.orders);
			})
			.catch((error) => console.error(error));
	};
	const API = 'https://e-commerce-clothings.herokuapp.com/api';

	const ImageHelper = ({product}) => {
		const imageurl = product
			? `${API}/product/photo/${product._id}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div className='viewallorder__img__wrapper'>
				<img src={imageurl} alt={product._id} />
			</div>
		);
	};
	const handleClick = (orderId) => {
		updateOrderStatus(user._id, orderId, token)
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					return;
				}
				updateOrder();
			})
			.catch((error) => console.error(error));
	};
	if (!user) return <Redirect to='/' />;
	return (
		<div
			onClick={() => {
				context.setShowDropDown(false);
			}}
			className='viewallorders'
		>
			<div className='viewallorders__order'>
				{orders.map((order) => {
					if (order.user)
						return (
							<div key={order._id} className='viewallorders__order__item'>
								<div className='viewallorders__order__item__title'>
									Invoice Number : {order._id}
								</div>
								<div className='viewallorders__order__item__user'>
									User : {order.user.name}
								</div>
								<div className='viewallorders__order__item__phone'>
									Phone Number : {order.phoneNo}
								</div>
								<b> Shipping Address : </b>
								<div className='viewallorders__order__item__address'>
									{order.street},{order.district},{order.state}.
								</div>
								<div className='viewallorders__order__item__products'>
									{order.products.map((pro) => {
										return (
											<div
												key={pro._id}
												className='viewallorders__order__item__products__product__main'
											>
												<div className='viewallorders__order__item__product__img'>
													<ImageHelper product={pro.product} />
												</div>
												<div className='viewallorders__order__item__products__product'>
													<div className='viewallorders__order__item__products__product__name'>
														{pro.product?.name}
													</div>
													<div className='viewallorders__order__item__products__product__size'>
														Size : {pro.size}
													</div>
													<div className='viewallorders__order__item__products__product__count'>
														Count : {pro.count}
													</div>
												</div>
											</div>
										);
									})}
								</div>{' '}
								<div
									style={{color: 'white', background: '#131921'}}
									className='order__body__order__product__total'
								>
									Total : Rs.{order.total}
								</div>
								<div
									className='viewallorder__status'
									style={
										order.status === 'Pending'
											? {backgroundColor: '#b77474'}
											: {backgroundColor: '#8bc34a'}
									}
								>
									{order.status}
								</div>
								{order.status === 'Pending' ? (
									<div className='viewallorder__updatestatus'>
										<button onClick={() => handleClick(order._id)}>
											{loading
												? 'Loading'
												: 'Click here if the product is deliverd'}
										</button>
									</div>
								) : (
									''
								)}
							</div>
						);
				})}
			</div>
		</div>
	);
}

export default ViewAllOrders;
