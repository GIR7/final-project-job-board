import axios from 'axios';
//corresponding search method with backend
const search = async (url, data) => {
	try {
		const response = await axios.request({
			method: 'SEARCH',
			url: url,
			data: data,
		});
		return response.data;
	} catch (error) {
		console.error('Error performing search:', error);
		throw error;
	}
};

export default search;
