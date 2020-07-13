import qs from 'qs';

function batchInterceptor(instance) {
	let requestFileIds = [];
	let initialiseBatchRequest = false;
	let waitingPromises = [];
	instance.interceptors.request.use(request => {
		if(!request.params.batchRequest) {
			requestFileIds.push(request.params.ids);
		}
		if(!initialiseBatchRequest) {
			// Trigger a single request to backend after 5 secs
			setTimeout(
				() => {
					return instance.get('/file-batch-api', {
						'params': {
							'ids': [...new Set(requestFileIds.flat())],
							'batchRequest': true
						}
					});
				}, 5000);
			initialiseBatchRequest = true;
		}
		if(request.params.batchRequest) {
			request.params = {
				'ids': JSON.stringify(request.params.ids)
			};
			request.paramsSerializer = (params) => {
				return qs.stringify(params);
			}
			return request;
		}
		// returning empty object will not hit the actual server, but would rather end up
		// in the error block of response interceptor which will return promise to the callee
		return {};
	}, error => Promise.reject(error));
	instance.interceptors.response.use(response => {
		// TODO: map response data to individial requests while resolving. 
		// I Couldn't do it now because backend api is not responding in the desired format.
		// for example - {"items":[{"id":"[fileid1"},{"id":"fileid2"},{"id":"fileid4]"}]}
		// there is an extra square bracket at the start of the fileid1 and at the end of the fileid4
		return waitingPromises.map(resolveFn => resolveFn("Test response"));
	}, (error) => {
		// Return an promise and keep the promise so that it can be resolved later.
		// There could be a better way to do this.
		if(!error.response) {
			return new Promise(resolve => waitingPromises.push(resolve));
		}
	});
}
export default batchInterceptor;