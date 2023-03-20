import axios from 'axios';

export const getCall = (url, method = 'get') => {
	return axios({
		method,
		url,
		headers: {
			Authorization: localStorage.getItem('token'),
		},
	});
};

export const putCall = (url, payload = {}, method = 'put') => {
	return axios({
		method,
		url,
		data: payload,
		headers: {
			Authorization: localStorage.getItem('token'),
			'content-type': 'multipart/form-data',
		},
	});
};

export const deleteCall = (url, method = 'delete') => {
	return axios({
		method,
		url,
		headers: {
			Authorization: localStorage.getItem('token'),
			'content-type': 'multipart/form-data',
		},
	});
};
