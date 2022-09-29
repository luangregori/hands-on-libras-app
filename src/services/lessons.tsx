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

export async function loadLessonsApi(categoryId?: string) {
	try {
		console.log('Loading lessons...');
		const response = await api.post('/api/lessons', { categoryId });
		console.log('Challenges loaded successfully!');
		return response.data

	} catch (error) {
		console.log('Error loading lessons!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function startLessonApi(lessonId: string) {
	try {
		console.log('Start lesson...', lessonId);
		const response = await api.post('/api/lesson/start', { lessonId });
		console.log('Challenge start successfully!');
		return response.data

	} catch (error) {
		console.log('Error start lesson!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function learnLessonApi(lessonId: string) {
	try {
		console.log('Learn lesson...', lessonId);
		const response = await api.post('/api/lesson/learn', { lessonId });
		console.log('Challenge learn successfully!');
		return response.data

	} catch (error) {
		console.log('Error learn lesson!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function completeLearnApi(lessonId: string) {
	try {
		console.log('Complete learn...', lessonId);
		const response = await api.post('/api/lesson/learn/complete', { lessonId });
		console.log('Complete learn successfully!');
		return response.data

	} catch (error) {
		console.log('Error complete learn!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function challengeLessonApi(lessonId: string) {
	try {
		console.log('Challenge Lesson...', lessonId);
		const response = await api.post('/api/lesson/challenge', { lessonId });
		console.log('Challenge Lesson loaded successfully!');
		return response.data
	} catch (error) {
		console.log('Error to Challenge Lesson!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}

export async function completeChallengeApi(lessonId: string, lives: string) {
	try {
		console.log('Complete challenge...', lessonId);
		const response = await api.post('/api/lesson/challenge/complete', { lessonId, lives });
		console.log('Complete challenge successfully!');
		return response.data
	} catch (error) {
		console.log('Error to Complete challenge!', error);
		if (error.response.status > 200 && error.response.status < 500){
			return error.response.data
		}
	}
}
