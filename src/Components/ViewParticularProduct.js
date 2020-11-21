import React, { useContext, useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { getProductByProductId } from '../helper/product';
import './ViewParticularProduct.css';

function ViewParticularProduct() {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState('');
	const [currCount, setCurrCount] = useState(1);
	const context = useContext(UserContext);
	const [size, setSize] = useState('');
	const [availableSize, setAvailableSize] = useState([]);
	const [cart, setCart] = useState([]);
	useEffect(() => {
		let productId = history.location.pathname.split('/')[2];
		getProductByProductId(productId)
			.then((result) => {
				if (result.error) {
					setLoading(false);
					console.error(result.error);
					return;
				}
				if (!result.product.size || result.product.size.length === 0) {
					let arr = ['S', 'M', 'L'];
					setAvailableSize(arr);
				} else {
					setAvailableSize(result.product.size);
				}
				setLoading(false);
				let oldCart = JSON.parse(localStorage.getItem('cart'));
				setCart(oldCart);
				setProduct(result.product);
			})
			.catch((error) => console.error(error));
	}, []);
	const showDescription = (str) => {
		let arr = JSON.parse(str).split(/\r\n|\r|\n/);
		return arr.map((a) => {
			return <div className="description">{a}</div>;
		});
	};
	const API = 'https://e-commerce-clothings.herokuapp.com/api';

	const ImageHelper = ({ product }) => {
		const imageurl = product
			? `${API}/product/photo/${product._id}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div className="viewparticularproduct__img__wrapper">
				<img src={imageurl} alt={product._id} />
			</div>
		);
	};
	const handleClick = (product) => {
		if (size.length === 0) {
			alert('Select the size to add to cart');
			return;
		}
		context.setClick(!context.click);
		let newCart = cart;
		let exists = newCart.filter((pro) => pro.product === product._id);
		if (exists.length >= 1) {
			newCart.forEach((pro) => {
				if (pro.product === product._id) {
					pro.count++;
				}
			});
		} else {
			product.count = 1;
			product.size = size;
			newCart.push({
				product: product._id,
				name: product.name,
				price: product.price,
				count: 1,
				size: size,
				stock: product.stock,
			});
		}
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};
	return (
		<div className="viewparticularproduct">
			{loading || product.length === 0 ? (
				<div className="loading">
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				</div>
			) : (
				<>
					<div className="viewparticularproduct__wrapper">
						<ImageHelper product={product} />
						<div className="viewparticularproduct__rightside">
							<div className="viewparticularproduct__title">{product.name}</div>
							<div className="viewparticularproduct__category">
								{product.category.name}
							</div>
							{product.stock === 0 ? (
								<div
									className="viewparticularproduct__tag"
									style={{ background: 'red' }}
								>
									OUT OF STOCK
								</div>
							) : (
								<div
									className="viewparticularproduct__tag"
									style={{ background: '#131921' }}
								>
									50% OFF
								</div>
							)}

							<div className="viewparticularproduct__price">
								<span className="viewparticularproduct__price__span">
									Rs. {product.price * 2}
								</span>
								Rs. {product.price}
							</div>
							<div className="viewparticularproduct__sizes">
								Sizes
								{availableSize.map((s, i) => {
									return (
										<div
											key={i}
											className="viewparticularproduct__sizes__label"
											style={
												size === s
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
												setSize(s);
											}}
										>
											{s}
										</div>
									);
								})}
							</div>
							<div className="viewparticularproduct__quantity">
								<div
									className="viewparticularproduct__quantity__plus"
									onClick={() => {
										handleClick(product);
										if (currCount < product.stock - 1)
											setCurrCount(currCount + 1);
									}}
								>
									+
								</div>
								<div className="viewparticularproduct__quantity__number">
									{currCount}
								</div>
								<div
									className="viewparticularproduct__quantity__minus"
									onClick={() => {
										handleClick(product);
										if (currCount > 1) setCurrCount(currCount - 1);
									}}
								>
									-
								</div>
							</div>
							{product.stock === 0 ? (
								<div className="viewparticularproduct__cart">Out of Stock</div>
							) : (
								<button
									onClick={() => handleClick(product)}
									className="viewparticularproduct__cart"
									disabled={product.stock === 0}
								>
									Add to Cart <FaShoppingCart />
								</button>
							)}
							<Link
								className="viewparticularproduct__back"
								to={`/category/${product.category._id}`}
							>
								Back
							</Link>
						</div>
					</div>

					<div className="viewparticularproduct__description">
						<div className="viewparticularproduct__description__title">
							Description
						</div>
						{showDescription(JSON.stringify(product.description))}
					</div>
				</>
			)}
		</div>
	);
}

export default ViewParticularProduct;
