import axios from 'axios';
import batchInterceptor from './interceptor';
export const apiClient = () => {
	const config = {
		'baseURL': 'https://europe-west1-quickstart-1573558070219.cloudfunctions.net',
		'headers': {}
	};
	const instance = axios.create(config);
	batchInterceptor(instance);
	return instance;
}