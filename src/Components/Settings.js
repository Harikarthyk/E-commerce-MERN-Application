import React, {useState} from "react";
import Loader from "react-loader-spinner";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated, savePasswordtoDB} from "../helper/auth";
import "./Settings.css";
function Settings() {
	const {user} = isAuthenticated();
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});
	const handleClick = (e) => {
		e.preventDefault();
		setLoading(true);
		let ip = {};
		ip["email"] = user.email;
		ip["password"] = password;
		savePasswordtoDB(ip)
			.then((result) => {
				if (result.error) {
					setLoading(false);
					setOutput({...output, error: true, message: result.error});
					return;
				}
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
	if (!user) return <Redirect to="/" />;

	return (
		<div className="settings">
			<div className="settings__header">Welcome {user.name}</div>
			<div className="settings__body">
				<div className="settings__tab">
					<b>Mail :</b> {user.email}
				</div>
				<div className="settings__tab">
					<b>Phone Number :</b> {user.phoneNo}
				</div>
				<div
					onClick={() => {
						setShowChangePassword(true);
					}}
					style={{
						textDecoration: " underline",
						cursor: "pointer",
					}}
					className="settings__tab"
				>
					<b>Change Password</b>
				</div>
				{showChangePassword ? (
					<form>
						<div
							className="addcategory__field"
							style={{
								width: "-webkit-fill-available",
							}}
						>
							<div className="addcategory__field__label">
								Enter new Password
							</div>
							<input
								type="password"
								value={password}
								required={true}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							disabled={password.length < 6}
							onClick={(e) => handleClick(e)}
						>
							Change Password
						</button>
					</form>
				) : (
					""
				)}
				{loading ? (
					<div className="loading">
						<Loader type="Oval" color="#00BFFF" height={50} width={50} />
					</div>
				) : (
					""
				)}
				{showResult()}
				<div className="settings__tab">
					<Link to={`/orders/${user._id}`}>View Your Orders</Link>
				</div>
			</div>
		</div>
	);
}

export default Settings;
