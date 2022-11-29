import api from './httpConfig';

export async function loginApi(email: string, password: string) {
	try {
		console.log('Logging in...');
		const response = await api.post('/api/login', { email, password });
		console.log('Logged in successfully!');
		return response.data
	} catch (error) {
		console.log('Error logging in!', error);
		if (error.response.status > 200 && error.response.status < 500) {
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
		if (error.response.status > 200 && error.response.status < 500) {
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
		if (error.response.status > 200 && error.response.status < 500) {
			return error.response.data
		}
	}
}

export async function updateUserApi(params: { name?: string, email?: string, newPassword?: string, oldPassword?: string, image_url?: string }) {
	try {
		console.log('Update user info...', { params });
		const response = await api.post('/api/update-user-info', params);
		console.log('User Info updated successfully!');
		return response.data;

	} catch (error) {
		console.log('Error Update user info!', error);
		if (error.response.status > 200 && error.response.status < 500) {
			return error.response.data
		}
	}
}

export async function recoverPasswordApi(email: string) {
	try {
		console.log('Recover Password up...');
		const response = await api.post('/api/recover-password', { email });
		console.log('Recover Password successfully!');
		return response.data;

	} catch (error) {
		console.log('Error recover password!', error);
		if (error.response.status > 200 && error.response.status < 500) {
			return error.response.data
		}
	}
}

export async function confirmCodeApi(email: string, code: string) {
	try {
		console.log('Confirm Code up...');
		const response = await api.post('/api/confirm-code', { email, code });
		console.log('Confirm Code successfully!');
		return response.data;

	} catch (error) {
		console.log('Error Confirm Code!', error);
		if (error.response.status > 200 && error.response.status < 500) {
			return error.response.data
		}
	}
}

export async function newPasswordApi(code: string, password: string, passwordConfirmation: string) {
	try {
		console.log('New Password up...');
		const response = await api.post('/api/new-password', { code, password, passwordConfirmation });
		console.log('New Password successfully!');
		return response.data;

	} catch (error) {
		console.log('Error New Password!', error);
		if (error.response.status > 200 && error.response.status < 500) {
			return error.response.data
		}
	}
}