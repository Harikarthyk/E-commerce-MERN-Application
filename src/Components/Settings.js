import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../helper/auth";
import "./Settings.css";
function Settings() {
	const {user} = isAuthenticated();
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [password, setPassword] = useState("");
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
					className="settings__tab"
				>
					<b>Change Password</b>
				</div>
				{showChangePassword ? (
					<div
						className="addcategory__field"
						style={{
							width: "-webkit-fill-available",
						}}
					>
						<div className="addcategory__field__label">Enter new Password</div>
						<input
							type="email"
							value={password}
							required={true}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				) : (
					""
				)}
				<div className="settings__tab">
					<Link to={`/orders/${user._id}`}>View Your Orders</Link>
				</div>
			</div>
		</div>
	);
}

export default Settings;
