import React, {useContext, useEffect, useState} from 'react';
import {FaShoppingBasket, FaUserCog} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import UserContext from '../context/UserContext';
import {isAuthenticated} from '../helper/auth';
import {logout} from '../helper/logout';
import './Header.css';

function Navbar() {
	const context = useContext(UserContext);
	const [cart, setCart] = useState(0);
	const {user, setUser} = context;
	useEffect(() => {
		updateCart();
	}, [context.setClick, context.click]);

	const updateCart = () => {
		if (!localStorage.getItem('cart')) {
			let temp = [];
			localStorage.setItem('cart', JSON.stringify(temp));
		}
		let newCart = JSON.parse(localStorage.getItem('cart'));

		setCart(newCart);
		return '';
	};
	useEffect(() => {
		let {user} = isAuthenticated();
		if (user) {
			setUser(user);
		} else setUser(false);
	}, [setUser]);
	const handleClick = () => {
		logout().then((result) => {
			console.log(result);
			if (result.error) {
				console.error(result.error);
				return;
			}
			setUser(false);
		});
	};
	// if (redirect.length >= 10) return <Redirect to={redirect} />;
	return (
		<div className='header__container'>
			<div className='header'>
				<Link className='header__img' to='/'>
					<img
						src='https://user-images.githubusercontent.com/54505967/101191949-5aae0580-3680-11eb-81c1-90f0778a741b.png'
						alt='amazon_logo'
						className='header__logo'
					/>
				</Link>
				<div className='header__Nav'>
					<div className='header__link'>
						<div className='header__option'>
							{user ? (
								<div onClick={() => handleClick()}>
									<div
										style={{color: 'white', textDecoration: 'none'}}
										className='header__option'
									>
										<span className='header__optionLineOne'>
											Hello {user.name.substring(0, 5)}
										</span>
										<span className='header__optionLineTwo'>Logout</span>
									</div>
								</div>
							) : (
								<Link to='/login'>
									<div style={{color: 'white'}} className='header__option'>
										<span className='header__optionLineOne'>Hello Guest</span>
										<span className='header__optionLineTwo'>Signin</span>
									</div>
								</Link>
							)}
						</div>
					</div>
					{user && user.role === 1 ? (
						<Link to='/adminpage'>
							<div className='header__link'>
								<div className='header__option'>
									<span className='header__optionLineOne'>Admin </span>
									<span className='header__optionLineTwo'>Page</span>
								</div>
							</div>
						</Link>
					) : (
						''
					)}
					{user && user.role !== 1 ? (
						<Link to={`/orders/${user._id}`}>
							<div className='header__link'>
								<div className='header__option'>
									<span className='header__optionLineOne'>view </span>
									<span className='header__optionLineTwo'>Orders</span>
								</div>
							</div>
						</Link>
					) : (
						''
					)}
					{user ? (
						<Link to='settings'>
							<div
								style={{color: 'white', fontSize: 'larger'}}
								className='header__option'
							>
								<FaUserCog />
							</div>
						</Link>
					) : (
						''
					)}
					<Link to='/checkout'>
						<div className=' header_baskerLink'>
							<div className='header__optionbasket'>
								<FaShoppingBasket style={{fontSize: '21px'}} />
								<div className='header_optionLineTwo header__basketcount'>
									{cart.length}{' '}
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
