import api from './httpConfig';

export async function loadCategoriesApi() {
	try {
		console.log('Loading categories...');
		const response = await api.get('/api/categories');
		console.log('Categories loaded successfully!');
		return response.data

	} catch (error) {
		console.log('Error loading categories!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		} 
	}
}

export async function loadChallengesApi(categoryId?: string) {
	try {
		console.log('Loading challenges...');
		const response = await api.post('/api/challenges', { categoryId });
		console.log('Challenges loaded successfully!');
		return response.data

	} catch (error) {
		console.log('Error loading challenges!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function startChallengesApi(challengeId: string) {
	try {
		console.log('Start challenge...', challengeId);
		const response = await api.post('/api/challenge/start', { challengeId });
		console.log('Challenge start successfully!');
		return response.data

	} catch (error) {
		console.log('Error start challenge!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}
