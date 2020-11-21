import React, { useEffect, useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import { fetchAllCategories } from '../helper/categories';

function Viewcategory() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetchAllCategories()
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					return;
				}
				setCategories(result.categories);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	});
	return (
		<div className="viewcategory">
			{loading ? (
				<div className="loading">
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				</div>
			) : (
				''
			)}
			{categories.map((category, index) => {
				return (
					<div key={category._id} className="viewcategory__list">
						<div className="viewcategory__title__name">{category.name}</div>

						<img src={category.link} className="viewcategory__title__img" />
						<div className="viewcategory__list__updatebtn">
							<button>
								<FaUpload />
							</button>
						</div>
						<div className="viewcategory__list__updatebtn">
							<button>
								<FaTrash />
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Viewcategory;
