import api from './httpConfig';

export async function loadRankingApi(days: number) {
	try {
		console.log('Loading Ranking...');
		const response = await api.post('/api/ranking', { days });
		console.log('Ranking loaded successfully!');
		return response.data

	} catch (error) {
		console.log('Error loading Ranking!', error);
		if (error.response.status > 200 && error.response.status < 500) {
			return error.response.data
		}
	}
}
