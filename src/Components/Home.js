import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { fetchAllCategories } from '../helper/categories';
import Coverphoto from './Coverphoto';
import './Home.css';

function Home() {
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
		<div className="home">
			<Coverphoto />
			<div className="home__description">Get FLAT 50% OFF on all our merch</div>
			{/* Category Display */}
			<div className="home__heading">Collections</div>

			<div className="home__category">
				{categories.map((category) => {
					return (
						<Link
							style={{ color: 'black' }}
							to={`/category/${category._id}`}
							className="home__category__wrapper"
							key={category._id}
						>
							<div className="home__category__wrapper__title">
								{category.name}
							</div>
							<div className="home__category__wrapper__body">
								<img src={category.link} alt={category.name} />
							</div>
						</Link>
					);
				})}
				{loading ? (
					<div className="loading">
						<Loader type="Oval" color="#00BFFF" height={50} width={50} />
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default Home;
