import api from './httpConfig';

export async function loginApi(email: string, password: string) {
	try {
		const response = await api.post('/api/login', { email, password });

		return response.data

	} catch (error) {
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
		console.log(error.response.data);   
	}
}

export async function signUpApi(name: string, email: string, password: string, passwordConfirmation: string) {
	try {
		const response = await api.post('/api/signup', { name, email, password, passwordConfirmation });

		return response.data;

	} catch (error) {
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
		console.log(error.response.data);  
	}
}