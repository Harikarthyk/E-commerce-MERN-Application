const API = 'https://e-commerce-clothings.herokuapp.com/api';
export const isAuthenticated = () => {
	if (typeof window === undefined) {
		return false;
	}
	if (localStorage.getItem('jwt')) {
		return JSON.parse(localStorage.getItem('jwt'));
	}
	return false;
};
export const isAdmin = () => {
	if (localStorage.getItem('jwt')) {
		let { user } = JSON.parse(localStorage.getItem('jwt'));
		if (user.role === 1) return true;
	}

	return false;
};
export const authenticate = (data) => {
	if (typeof window !== undefined) {
		localStorage.setItem('jwt', JSON.stringify(data));
	}
};

export const getOTP = (email) => {
	return fetch(`${API}/forgotpassword`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(email),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const savePasswordtoDB = (input) => {
	return fetch(`${API}/set/password`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(input),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
