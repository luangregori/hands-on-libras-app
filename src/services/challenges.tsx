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

export async function learnChallengesApi(challengeId: string) {
	try {
		console.log('Learn challenge...', challengeId);
		const response = await api.post('/api/challenge/learn', { challengeId });
		console.log('Challenge learn successfully!');
		return response.data

	} catch (error) {
		console.log('Error learn challenge!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function completeLearnApi(challengeId: string) {
	try {
		console.log('Complete learn...', challengeId);
		const response = await api.post('/api/challenge/learn/complete', { challengeId });
		console.log('Complete learn successfully!');
		return response.data

	} catch (error) {
		console.log('Error complete learn!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function testChallengeApi(challengeId: string) {
	try {
		return [
			{
				"word": "médico",
				"options": [
					"a",
					"b",
					"c",
					"médico"
				],
				"challengeId": "62be058113d1b934ce217af2",
				"id": "63289add0cba39a13d0af736"
			},
			{
				"word": "dor",
				"options": [
					"dor",
					"a",
					"b",
					"c"
				],
				"challengeId": "62be058113d1b934ce217af2",
				"id": "63289add0cba39a13d0af737"
			},
			{
				"word": "ajuda",
				"options": [
					"a",
					"b",
					"ajuda",
					"c"
				],
				"challengeId": "62be058113d1b934ce217af2",
				"id": "63289add0cba39a13d0af738"
			},
			{
				"word": "enfermeira",
				"options": [
					"a",
					"enfermeira",
					"b",
					"c"
				],
				"challengeId": "62be058113d1b934ce217af2",
				"id": "63289add0cba39a13d0af739"
			}
		]
		console.log('Test challenge...', challengeId);
		const response = await api.post('/api/challenge/test', { challengeId });
		console.log('Test challenge loaded successfully!');
		return response.data
	} catch (error) {
		console.log('Error to test challenge!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}
