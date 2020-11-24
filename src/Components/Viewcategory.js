import React, {useEffect, useState} from 'react';
import {FaTrash, FaUpload} from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import {isAuthenticated} from '../helper/auth';
import {
	deleteCategory,
	fetchAllCategories,
	updatCategory,
} from '../helper/categories';

function Viewcategory() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const {user, token} = isAuthenticated();
	useEffect(() => {
		preLoadCategories();
	}, []);
	const preLoadCategories = () => {
		fetchAllCategories()
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					return;
				}
				result.categories.map((c) => (c.showEdit = false));
				setCategories(result.categories);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};
	const handleClickTrash = (categoryId) => {
		setLoading(true);
		deleteCategory(user._id, token, categoryId)
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					setLoading(false);
					return;
				}
				alert('Category Deleted Successfully ');
				preLoadCategories();
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};
	const handleClickEdit = (category) => {
		setLoading(true);

		updatCategory(user._id, token, category._id, category).then((result) => {
			if (result.error) {
				setLoading(false);
				alert('Error in updating the category');
			}
			let newCate = categories.filter((c) => {
				if (c._id === category._id) {
					c.showEdit = false;
				}
				return c;
			});
			setCategories(newCate);
			alert('Category Updated Successfully');
			setLoading(false);
		});
	};
	return (
		<div className='viewcategory'>
			{loading ? (
				<div className='loading'>
					<Loader type='Oval' color='#00BFFF' height={50} width={50} />
				</div>
			) : (
				''
			)}
			{categories.map((category, index) => {
				return (
					<React.Fragment key={category._id}>
						<div className='viewcategory__list'>
							<div className='viewcategory__title__name'>{category.name}</div>

							<img
								src={category.link}
								alt={category.name}
								className='viewcategory__title__img'
							/>
							<div className='viewcategory__list__updatebtn'>
								<button
									onClick={() => {
										let newCate = categories.filter((c) => {
											if (c._id === category._id) {
												c.showEdit = !c.showEdit;
											}
											return c;
										});
										setCategories(newCate);
									}}
								>
									<FaUpload />
								</button>
							</div>

							<div className='viewcategory__list__updatebtn'>
								<button onClick={() => handleClickTrash(category._id)}>
									<FaTrash />
								</button>
							</div>
						</div>
						{category.showEdit ? (
							<div>
								<div className='addcategory__field'>
									<div className='addcategory__field__label'>
										Category Name :
									</div>
									<input
										onChange={(e) => {
											let newCate = categories.filter((c) => {
												if (c._id === category._id) {
													c.name = e.target.value;
												}
												return c;
											});
											setCategories(newCate);
										}}
										type='text'
										value={category.name}
									/>
								</div>
								<div className='addcategory__field'>
									<div className='addcategory__field__label'>
										Category Image Link :
									</div>
									<input
										onChange={(e) => {
											let newCate = categories.filter((c) => {
												if (c._id === category._id) {
													c.link = e.target.value;
												}
												return c;
											});
											setCategories(newCate);
										}}
										type='text'
										value={category.link}
									/>
								</div>
								<button
									onClick={() => handleClickEdit(category)}
									className='viewcategory__update'
								>
									Update Category
								</button>
							</div>
						) : (
							''
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
}

export default Viewcategory;
