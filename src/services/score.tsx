import api from './httpConfig';

export async function loadScoreApi() {
	try {
		console.log('Loading Score...');
		const response = await api.post('/api/score');
		console.log('Score loaded successfully!'), response.data;
		return response.data

	} catch (error) {
		console.log('Error loading Score!', error);
		if (error.response.status > 200 && error.response.status < 500) {
			return error.response.data
		}
	}
}
