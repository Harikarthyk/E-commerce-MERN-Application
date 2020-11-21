import React, { useEffect, useState } from 'react';
import { getEachProduct } from '../helper/product';
import { getEachCategoryDetails } from '../helper/categories';
import './HomeProductView.css';
import { Link, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

function HomeProductView() {
	const history = useHistory();
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState('');
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let categoryId = history.location.pathname.split('/')[2];
		getEachCategoryDetails(categoryId).then((res) => {
			if (res.error) {
				console.error(res.error);
				return;
			}
			setCategory(res.category);
		});
		getEachProduct(categoryId)
			.then((result) => {
				if (result.error) {
					setLoading(false);
					console.error(result.error);
					return;
				}
				setProducts(result.products);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	}, [history.location.pathname]);
	const API = 'https://e-commerce-clothings.herokuapp.com/api';

	const ImageHelper = ({ product }) => {
		const imageurl = product
			? `${API}/product/photo/${product._id}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div className="homeproduct__img__wrapper">
				<img src={imageurl} alt={product._id} />
			</div>
		);
	};
	return (
		<div className="homeproductview">
			<div className="homeproductview__title">
				<Link
					to="/"
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
					Go Back
				</Link>
				{category.name}
			</div>
			{loading ? (
				<div className="loading">
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				</div>
			) : (
				''
			)}
			{products.length === 0 && !loading ? (
				<div className="homeproductview__body__noproduct">
					Product List Is Empty In This Category : (
				</div>
			) : (
				''
			)}
			<div className="homeproductview__body">
				{products.map((product) => {
					return (
						<Link
							key={product._id}
							to={`/product/${product._id}`}
							className="homeproductview__body__product"
						>
							<div
								className="homeproduct__body__product__tag"
								style={
									product.stock === 0
										? { backgroundColor: 'red ' }
										: { backgroundColor: '#131921' }
								}
							>
								{product.stock === 0 ? 'OUT OF STOCK' : '50% OFF'}
							</div>
							<ImageHelper product={product} />
							<div className="homeproductview__body__product__title">
								{product.name}
							</div>
							<div className="homeproductview__body__product__stock">
								<span className="homeproductview__body__product__stock__span">
									Rs.{Number(product.price) * 2}
								</span>
								<b>Rs. {product.price}</b>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default HomeProductView;
