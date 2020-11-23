import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./Components/Home";
import Login from "./Components/Login";
import Header from "./Components/Header";
import CreateAccount from "./Components/CreateAccount";
import Footer from "./Components/Footer";
import {useState} from "react";
import UserContext from "./context/UserContext";
import Adminpage from "./Components/Adminpage";
import HomeProductView from "./Components/HomeProductView";
import ViewParticularProduct from "./Components/ViewParticularProduct";
import CheckOut from "./Components/CheckOut";
import BuyPage from "./Components/BuyPage";
import Order from "./Components/Order";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ForgotPassword from "./Components/ForgotPassword";
import Settings from "./Components/Settings";

function App() {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [click, setClick] = useState(false);
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<UserContext.Provider
						value={{
							user,
							setUser,
							token,
							setToken,
							click,
							setClick,
						}}
					>
						<Header />
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/createAccount" component={CreateAccount} />
						<Route exact path="/adminpage" component={Adminpage} />
						<Route exact path="/category/*" component={HomeProductView} />
						<Route exact path="/product/*" component={ViewParticularProduct} />
						<Route exact path="/checkout" component={CheckOut} />
						<Route exact path="/checkout/buy" component={BuyPage} />
						<Route exact path="/orders/*" component={Order} />
						<Route exact path="/forgotpassword" component={ForgotPassword} />
						<Route exact path="/settings" component={Settings} />
						<Route
							path="/instagram"
							component={() => {
								window.location.href =
									"https://www.instagram.com/hari_karthyk/";
								return null;
							}}
						/>
						<Route
							path="/github"
							component={() => {
								window.location.href = "https://github.com/Harikarthyk";
								return null;
							}}
						/>
						<Route
							path="/linkedin"
							component={() => {
								window.location.href =
									"https://www.linkedin.com/in/hari-karthikkeyyan-116aaa1b3/";
								return null;
							}}
						/>
						<Route
							path="/facebook"
							component={() => {
								window.location.href = "https://www.facebook.com/hari.karthyk";
								return null;
							}}
						/>
						<Footer />
					</UserContext.Provider>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
