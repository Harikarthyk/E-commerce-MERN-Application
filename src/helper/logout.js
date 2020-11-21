const API = 'https://e-commerce-clothings.herokuapp.com/api';
export const logout = () => {
	if (typeof window !== undefined) {
		localStorage.removeItem('jwt');
		return fetch(`${API}/logout`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.catch((error) => console.log(error));
	}
};
