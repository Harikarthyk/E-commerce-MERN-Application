const API = 'https://e-commerce-clothings.herokuapp.com/api';
// const API = 'http://localhost:5050/api';

export const addProduct = (input, token, userId) => {
	return fetch(`${API}/add/product/${userId}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: input,
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getAllProducts = () => {
	return fetch(`${API}/all/products`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getEachProduct = (categoryId) => {
	return fetch(`${API}/category/product/${categoryId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getProductByProductId = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/delete/product/${productId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
