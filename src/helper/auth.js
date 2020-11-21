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
