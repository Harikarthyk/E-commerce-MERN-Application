import React, {useContext, useEffect, useState} from 'react';
import {FaPen, FaTrash} from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import UserContext from '../context/UserContext';
import {isAuthenticated} from '../helper/auth';
import {fetchAllCategories} from '../helper/categories';
import {deleteProduct, getAllProducts, getEachProduct} from '../helper/product';

function ViewProduct() {
	const [categories, setCategories] = useState([]);
	const [currentCategory, setCurrentCategory] = useState(0);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const context = useContext(UserContext);
	useEffect(() => {
		fetchAllCategories().then((result) => {
			if (result.error) {
				console.error(result.error);
				return;
			}
			setCategories(result.categories);
		});
	});
	useEffect(() => {
		if (currentCategory == 0) {
			getAllProducts()
				.then((result) => {
					if (result.error) {
						console.error(result.error);
						return;
					}
					result.products.forEach((p) => (p.showEdit = false));
					setProducts(result.products);
					setLoading(false);
				})
				.catch((error) => console.error(error));
			return;
		} else
			getEachProduct(currentCategory)
				.then((result) => {
					if (result.error) {
						console.error(result.error);
						return;
					}
					setProducts(result.products);
					setLoading(false);
				})
				.catch((error) => console.error(error));
	}, [currentCategory, setCurrentCategory]);
	const API = 'https://e-commerce-clothings.herokuapp.com/api';

	const ImageHelper = ({product}) => {
		const imageurl = product
			? `${API}/product/photo/${product._id}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div className='viewproduct__img__wrapper'>
				<img src={imageurl} alt={product._id} />
			</div>
		);
	};
	const handleClickTrash = (productId) => {
		const {user, token} = isAuthenticated();
		deleteProduct(productId, user._id, token).then((result) => {
			if (result.error) {
				console.error(result.error);
				return;
			}

			alert(
				'Product Deleted Successfully , refresh if the product is not deleted',
			);
			setCurrentCategory(currentCategory);
		});
	};
	const handleClickEdit = (product) => {
		console.log(product);
	};
	return (
		<div
			onClick={() => {
				context.setShowDropDown(false);
			}}
			className='viewproduct'
		>
			<select
				onChange={(e) => {
					setLoading(true);
					setCurrentCategory(e.target.value);
				}}
			>
				<option value={0}>All</option>
				{categories.map((cate) => (
					<option key={cate._id} value={cate._id}>
						{cate.name}
					</option>
				))}
			</select>
			{loading ? (
				<div className='loading'>
					<Loader type='Oval' color='#00BFFF' height={50} width={50} />
				</div>
			) : (
				''
			)}
			<div className='viewproduct__body'>
				<div className='viewproduct__body__total'>
					fetching {products.length} products
				</div>
				{products.length && loading === 0 ? (
					<div className='viewproduct__body__empty'>
						No prodcut found in this Category : (
					</div>
				) : (
					''
				)}
				{products.map((product, index) => {
					return (
						<React.Fragment key={product._id}>
							<div className='viewproduct__body__product'>
								<div className='viewproduct__body__product__name'>
									{index + 1}) {product.name}
								</div>
								<div className='viewproduct__body__product__fied'>
									<div className='viewproduct__body__product__fied__input'>
										<ImageHelper product={product} />
									</div>

									<div className='viewproduct__body__product__fied__input'>
										<div className='viewproduct__body__product__field__label'>
											Stock <b>{product.stock}</b>
										</div>
									</div>
									<div className='viewproduct__body__product__fied__input'>
										<div className='viewproduct__body__product__field__label'>
											Price <b>{product.price} Rs</b>
										</div>
									</div>
									<div className='viewproduct__body__product__fied__input'>
										<button
											onClick={() => {
												let newProd = products.filter((p) => {
													if (p._id === product._id) p.showEdit = !p.showEdit;
													return p;
												});
												setProducts(newProd);
											}}
										>
											<FaPen />
										</button>
									</div>
									<div className='viewproduct__body__product__fied__input'>
										<button onClick={() => handleClickTrash(product._id)}>
											<FaTrash />
										</button>
									</div>
								</div>
							</div>
							{product.showEdit ? (
								<>
									<div className='addcategory__field'>
										<div className='addcategory__field__label'>
											Product Name{' '}
										</div>
										<input
											type='text'
											onChange={(e) => {
												// setInput({...input, name: e.target.value});
											}}
											value={product.name}
										/>
									</div>
									<div className='addcategory__field'>
										<div className='addcategory__field__label'>
											Select Category
										</div>
										<select
											onChange={(e) => {
												// setInput({...input, category: e.target.value});
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
									<div className='addcategory__field'>
										<input
											type='file'
											accept='image'
											placeholder='choose a file'
										/>
									</div>
									<div className='addcategory__field'>
										<div className='addcategory__field__label'>Stock </div>
										<input
											// onChange={(e) => setInput({...input, stock: e.target.value})}
											type='number'
											value={product.stock}
										/>
									</div>
									<div className='addcategory__field'>
										<div className='addcategory__field__label'>Price </div>
										<input
											// onChange={(e) => setInput({...input, price: e.target.value})}
											type='number'
											value={product.price}
										/>
									</div>

									<div className='addcategory__field'>
										<div className='addcategory__field__label'>
											Description{' '}
										</div>
										<textarea value={product.description} />
									</div>
									<button
										onClick={() => handleClickEdit(product)}
										className='viewcategory__update'
									>
										Update Category
									</button>
								</>
							) : (
								''
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}

export default ViewProduct;
