import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../helper/login';
// import './CreateAccount.css';

function CreateAccount() {
	const [input, setInput] = useState({
		name: '',
		password: '',
		phoneNo: '',
		email: '',
	});
	const [output, setOutput] = useState({
		error: false,
		message: '',
	});
	const showResult = () => {
		return (
			<div className="result">
				{output.message.length > 0 ? (
					<div
						className="result__message"
						style={
							output.error
								? { backgroundColor: '#ea6c6c' }
								: { backgroundColor: '#8bc34a' }
						}
					>
						{output.message}
					</div>
				) : (
					''
				)}
			</div>
		);
	};
	const handleClick = (e) => {
		e.preventDefault();
		register(input)
			.then((result) => {
				if (result.error) {
					setOutput({ ...output, error: true, message: result.error });
					console.error(result.error);
					return;
				}
				setOutput({ ...output, error: false, message: 'Login to Continue' });
				setInput({ ...input, name: '', password: '', email: '', phoneNo: '' });
			})
			.catch((error) => console.error(error));
	};
	return (
		<div className="login">
			<div className="login__heading">Create Account</div>
			{showResult()}
			<div className="login__wrapper">
				<form className="login__wrapper__body">
					<div className="login__wrapper__body__field">
						<div className="login__wrapper__body__label">Name</div>
						<input
							type="text"
							value={input.name}
							onChange={(e) => {
								setInput({ ...input, name: e.target.value });
							}}
							required
							className="login__wrapper__body__inputfield"
						/>
					</div>
					<div className="login__wrapper__body__field">
						<div className="login__wrapper__body__label">Phone number</div>
						<input
							type="number"
							value={input.phoneNo}
							onChange={(e) => {
								setInput({ ...input, phoneNo: e.target.value });
							}}
							required
							className="login__wrapper__body__inputfield"
						/>
					</div>
					<div className="login__wrapper__body__field">
						<div className="login__wrapper__body__label">Email</div>
						<input
							type="email"
							value={input.email}
							onChange={(e) => {
								setInput({ ...input, email: e.target.value });
							}}
							required
							className="login__wrapper__body__inputfield"
						/>
					</div>
					<div className="login__wrapper__body__field">
						<div className="login__wrapper__body__label">Password</div>
						<input
							type="password"
							className="login__wrapper__body__inputfield"
							value={input.password}
							onChange={(e) => {
								setInput({ ...input, password: e.target.value });
							}}
							required
						/>
					</div>
					<div className="login__wrapper__login__button">
						<button
							disabled={
								!input.email || !input.name || !input.phoneNo || !input.password
							}
							onClick={(e) => handleClick(e)}
						>
							Create Account
						</button>
					</div>
					<div className="login__wrapper__forgetpassword">
						<Link to="/" style={{ textDecoration: 'none !important' }}>
							<button>Return To Store</button>
						</Link>
					</div>
				</form>

				<div className="login__wrapper__btn">
					<div className="login__wrapper__subheading">
						Already have an Account
					</div>
					<Link to="/login">
						<button className="login__wrapper__btn__listner">Login</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default CreateAccount;
