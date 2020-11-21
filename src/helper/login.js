const API = 'https://e-commerce-clothings.herokuapp.com/api';
export const login = (input) => {
	return fetch(`${API}/login`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(input),
	})
		.then((res) => res.json())
		.catch((error) => console.error(error));
};
export const register = (input) => {
	return fetch(`${API}/register`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(input),
	})
		.then((res) => res.json())
		.catch((error) => console.error(error));
};
