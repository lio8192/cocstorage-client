import axios from './index';

export function fetchMainContents() {
	return axios().get('/main/content');
}

export default fetchMainContents;
