import React, {useContext, useState} from "react";
import Loader from "react-loader-spinner";
import {Link, Redirect} from "react-router-dom";
import UserContext from "../context/UserContext";
import {authenticate} from "../helper/auth";
import {login} from "../helper/login";
import "./Login.css";
function Login() {
	const context = useContext(UserContext);
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const {user, setUser, setToken} = context;
	const [output, setOutput] = useState({
		error: "",
		message: "",
		loading: false,
		redirect: false,
	});
	const errorMessage = () => {
		return (
			<div className="error__message">
				{output.error ? (
					<div className="error__message__text">{output.error}</div>
				) : (
					""
				)}
			</div>
		);
	};

	const showMessage = () => {
		return (
			<div className="error__message">
				{output.message ? (
					<div
						className="success__message__text"
						style={{backgroundColor: "green !important"}}
					>
						{output.message}
					</div>
				) : (
					""
				)}
			</div>
		);
	};
	const handleClick = (e) => {
		e.preventDefault();
		setOutput({...input, loading: true});
		login(input)
			.then((result) => {
				let err = "";
				let msg = "";

				if (result.error) {
					err = result.error;
				} else {
					msg = result.message;
					setUser(result.user);
					setToken(result.token);
					authenticate(result);
					setOutput({...output, redirect: true});
				}
				setOutput({...output, message: msg, error: err, loading: false});
			})
			.catch((error) => console.error(error));
	};
	if (user) return <Redirect to="/" />;
	return (
		<div className="login">
			<div className="login__heading">Login</div>
			{console.log(output)}
			<div className="login__wrapper">
				<form className="login__wrapper__body">
					<div className="login__wrapper__body__field">
						<div className="login__wrapper__body__label">Email</div>
						<input
							value={input.email}
							onChange={(e) => {
								setInput({...input, email: e.target.value});
							}}
							type="email"
							required
							className="login__wrapper__body__inputfield"
						/>
					</div>
					<div className="login__wrapper__body__field">
						<div className="login__wrapper__body__label">Password</div>
						<input
							type="password"
							value={input.password}
							onChange={(e) => {
								setInput({...input, password: e.target.value});
							}}
							required
							className="login__wrapper__body__inputfield"
						/>
					</div>
					{errorMessage()}
					{showMessage()}
					<div className="loading__icon">
						{output.loading ? (
							<div className="loading">
								<Loader type="Oval" color="#00BFFF" height={50} width={50} />
							</div>
						) : (
							""
						)}
					</div>
					<div className="login__wrapper__login__button">
						<button onClick={(e) => handleClick(e)}>Login</button>
					</div>
					<div className="login__wrapper__forgetpassword">
						<Link to="/forgotpassword">forgot your password?</Link>
					</div>
				</form>
				<div className="login__wrapper__btn">
					<div className="login__wrapper__subheading">New Customer?</div>
					<Link to="/createAccount">
						<button className="login__wrapper__btn__listner">
							Create an Account
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
