/**
 *  Import action creator constants & dependencies
 */
import { grievanceConstants } from '../constants';
import { API_URLS } from '../../configs/url';

export const getGrievances = ({type, search, page, start_date, end_date}) => ({
	type: grievanceConstants.GET_GRIEVANCES,
	payload: {
		request: {
			url: API_URLS.BASE_URL_V2 + 'grievances',
			method: 'get',
			params: {
				status: type,
				sort: '-SlNo',
				search: search.length ? search : null,
				page,
				'per-page': 20,
				start_date,
				end_date,
			}
		},
	},
	grievanceType: type,
	page
});


export const getSingleGrievance = (id) => ({
	type: grievanceConstants.GET_SINGLE_GRIEVANCE,
	payload: {
		request: {
			url: `${API_URLS.GRIEVANCES}/${id}`,
			method: 'get',
		},
	},
});

export const closeGrievance = (id, data) => ({
	type: grievanceConstants.CLOSE_GRIEVANCE,
	payload: {
		request: {
			url: `${API_URLS.GRIEVANCES}/${id}/close`,
			method: 'post',
			data
		},
	},
});

export const clearGrievances = () => ({
	type: grievanceConstants.CLEAR_GRIEVANCES
})