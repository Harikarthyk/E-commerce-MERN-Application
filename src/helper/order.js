const API = 'https://e-commerce-clothings.herokuapp.com/api';
// const API = 'http://localhost:5050/api';
export const placeOrder = (userId, token, input) => {
	return fetch(`${API}/place/order/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(input),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getAllOrderAdmin = (userId, token) => {
	return fetch(`${API}/all/orders/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getOrderByUserId = (userId, token) => {
	return fetch(`${API}/orders/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const updateOrderStatus = (userId, orderId, token) => {
	return fetch(`${API}/update/status/order/${orderId}/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status: 'Delivered' }),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
