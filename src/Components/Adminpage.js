import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {isAuthenticated} from "../helper/auth";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import "./Adminpage.css";
import ViewAllOrders from "./ViewAllOrders";
import Viewcategory from "./Viewcategory";
import ViewProduct from "./ViewProduct";

function Adminpage() {
	const [view, setView] = useState("Manage Categories");
	const {user} = isAuthenticated();
	const showAdminDashboard = () => {
		if (view === "Manage Categories") {
			return <Viewcategory />;
		} else if (view === "Add Category") return <AddCategory />;
		else if (view === "Add products") return <AddProduct />;
		else if (view === "ViewAllOrders.js") return <ViewProduct />;
		else return <ViewAllOrders />;
	};
	if (!user) return <Redirect to="/" />;
	return (
		<div className="adminpage">
			<div className="adminpage__title">
				Admin Dashboard
				<span className="adminpage__title__card"> {user.name}</span>
			</div>
			<div className="adminpage__dropdown">
				<select
					onChange={(e) => {
						setView(e.target.value);
					}}
				>
					<option value="Manage Categories">Manage Categories</option>
					<option value="Add Category">Add Category</option>
					<option value="Add products">Add products</option>
					<option value="ViewAllOrders.js">Manage Products</option>
					<option value="View All Orders">View All Orders</option>
				</select>
			</div>
			<div className="adminpage__body">{showAdminDashboard()}</div>
		</div>
	);
}

export default Adminpage;
