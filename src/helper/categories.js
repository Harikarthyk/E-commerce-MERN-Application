const API = "https://e-commerce-clothings.herokuapp.com/api";
export const fetchAllCategories = () => {
	return fetch(`${API}/all/category`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.catch((error) => console.error(error));
};

export const addCategorytoDB = (userId, token, input) => {
	return fetch(`${API}/add/category/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(input),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getEachCategoryDetails = (categoryId) => {
	return fetch(`${API}/category/${categoryId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const deleteCategory = (userId, token, categoryId) => {
	return fetch(`${API}/delete/${categoryId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
