import axios from 'axios';
import { API_BASE_URL, CLIENT_GET_CATEGORY } from '../constant';

export async function getCategory(params) {
    try {
        const response = await axios.get(API_BASE_URL + CLIENT_GET_CATEGORY, {
            params: params,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
