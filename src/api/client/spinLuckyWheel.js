import useStore from '@/stores/clientStore';
import api from '@/utils/interceptors';
import { API_BASE_URL, CLIENT_LUCKY_WHEEL } from '../constant';
import { getProfile } from './profile';

export async function clickLuckyWheel(id) {
    try {
        const response = await api.post(API_BASE_URL + CLIENT_LUCKY_WHEEL + '/' + id + '/spinning');

        const profile = await getProfile();
        useStore.getState().setUserProfile(profile?.result);

        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}