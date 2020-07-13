import { apiClient } from './apiClient';
// All requests should run at the same time and produce only one requestto the backend. All requests should return or reject.

export const runTest = () =>  {
	const batchUrl = '/file-batch-api';
	const api = apiClient();

	// Should return [{id:'fileid1'},{id:'fileid2'}]
	let first = api.get(batchUrl, {'params': {ids: ['fileid1','fileid2']}});
	      
	// Should return [{id:'fileid2'}]
	let second = api.get(batchUrl, {'params': {ids: ['fileid2']}});

	// Should reject as the fileid3 is missing from the response
	let third = api.get(batchUrl, {'params': {ids: ['fileid3']}});  

	first.then(data => console.log("first data is " + data));
	second.then(data => console.log("second data is " + data));
	third.then(data => console.log("third data is " + data));

}
