import React, {useEffect, useState} from "react";
import Loader from "react-loader-spinner";
import {Redirect} from "react-router-dom";
import {getOTP, savePasswordtoDB} from "../helper/auth";
import "./ForgotPassword.css";
function ForgotPassword() {
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showOtp, setShowOtp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [ipOTP, setIpOTP] = useState("");
	const [crtOPT, setCrtOTP] = useState("");
	useEffect(() => {
		if (localStorage.getItem("user")) {
			setRedirect(true);
		}
	}, []);
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});
	const verifyOTP = (e) => {
		e.preventDefault();
		if (ipOTP !== crtOPT) {
			setOutput({...output, message: "Wrong OTP", error: true});
			setShowPassword(false);
		} else {
			setShowPassword(true);
			setOutput({...output, message: "OTP Matched", error: false});
		}
	};
	const [email, setEmail] = useState("");
	const handleClickOTP = (e) => {
		e.preventDefault();
		setLoading(true);
		getOTP({email: email})
			.then((result) => {
				if (result.error) {
					setLoading(false);
					setOutput({...output, error: true, message: result.error});
					return;
				}
				setCrtOTP(result.OTP);
				setShowOtp(true);
				setOutput({...output, error: false, message: result.message});
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};
	const showResult = () => {
		return (
			<div className="result">
				{output.message.length > 0 ? (
					<div
						className="result__message"
						style={
							output.error
								? {backgroundColor: "#ea6c6c"}
								: {backgroundColor: "#8bc34a"}
						}
					>
						{output.message}
					</div>
				) : (
					""
				)}
			</div>
		);
	};
	const saveNewPassword = (e) => {
		e.preventDefault();
		setLoading(true);
		let ip = {email: email, password: password};
		savePasswordtoDB(ip)
			.then((result) => {
				if (result.error) {
					setLoading(false);
					setOutput({...output, error: true, message: result.error});
					return;
				}
				setCrtOTP(result.OTP);
				setOutput({...output, error: false, message: result.message});
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};
	if (redirect) return <Redirect to="/" />;
	return (
		<div className="forgotpassword">
			<div className="forgotpassword__title">Forgot Password</div>
			{showResult()}
			{loading ? (
				<div className="loading">
					<Loader type="Oval" color="#00BFFF" height={50} width={50} />
				</div>
			) : (
				""
			)}
			<form>
				<div
					className="addcategory__field"
					style={{
						width: "-webkit-fill-available",
					}}
				>
					<div className="addcategory__field__label"> Enter your email </div>
					<input
						type="email"
						value={email}
						required={true}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				{!showOtp ? (
					<button type="submit" onClick={(e) => handleClickOTP(e)}>
						GET OTP
					</button>
				) : (
					<>
						<div
							className="addcategory__field"
							style={{
								width: "-webkit-fill-available",
							}}
						>
							<div className="addcategory__field__label"> Enter the OTP </div>
							<input
								type="text"
								value={ipOTP}
								required={true}
								onChange={(e) => setIpOTP(e.target.value)}
							/>
						</div>
						<button type="submit" onClick={(e) => verifyOTP(e)}>
							Verify OTP
						</button>
					</>
				)}
				{showPassword ? (
					<>
						<div
							className="addcategory__field"
							style={{
								width: "-webkit-fill-available",
							}}
						>
							<div className="addcategory__field__label">
								{" "}
								Enter your new Password{" "}
							</div>
							<input
								type="password"
								value={password}
								required={true}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button type="submit" onClick={(e) => saveNewPassword(e)}>
							Save Password
						</button>
					</>
				) : (
					""
				)}
			</form>
		</div>
	);
}

export default ForgotPassword;
