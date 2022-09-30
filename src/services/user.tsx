import api from './httpConfig';

export async function loginApi(email: string, password: string) {
	try {
		console.log('Logging in...');
		const response = await api.post('/api/login', { email, password });
		console.log('Logged in successfully!');
		return response.data
	} catch (error) {
		console.log('Error logging in!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function signUpApi(name: string, email: string, password: string, passwordConfirmation: string) {
	try {
		console.log('Signing up...');
		const response = await api.post('/api/signup', { name, email, password, passwordConfirmation });
		console.log('Signed up successfully!');
		return response.data;

	} catch (error) {
		console.log('Error signing up!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function loadUserApi() {
	try {
		console.log('Loading user info...');
		const response = await api.post('/api/user-info');
		console.log('User Info loaded successfully!');
		return response.data;

	} catch (error) {
		console.log('Error Loading user info!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}