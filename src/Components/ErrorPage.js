import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';
function ErrorPage() {
	return (
		<div className="errorpage">
			Error 404 Not Found
			<Link className="errorpage__link" to="/">
				Continue Shopping...
			</Link>
		</div>
	);
}

export default ErrorPage;
