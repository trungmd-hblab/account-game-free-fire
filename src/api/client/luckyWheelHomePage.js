import axios from 'axios';
import { API_BASE_URL, CLIENT_LUCKY_WHEEL } from '../constant';

export async function getLuckyWheel(params) {
    try {
        const response = await axios.get(API_BASE_URL + CLIENT_LUCKY_WHEEL, {
            params: params,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}