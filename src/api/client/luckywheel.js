import { useClientHimaQuery } from '@/hooks/useClientHimaQuery';
import useStore from '@/stores/clientStore';
import api from '@/utils/interceptors';
import { API_BASE_URL, CLIENT_LUCKY_WHEEL } from '../constant';
import { getProfile } from './profile';


export const useGetLuckyWheel = (queryParams) => {
    return useClientHimaQuery({
        name: ['luckyWheel', queryParams.page],
        path: `${API_BASE_URL}${CLIENT_LUCKY_WHEEL}`,
        method: 'GET',
        params: queryParams,
    });
};

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

export const useGetDetailLuckyWheel = (id) => {
    return useClientHimaQuery({
        name: ['luckyWheelDetail', id],
        path: API_BASE_URL + CLIENT_LUCKY_WHEEL + '/' + id,
        method: 'GET',
        enabled: !!id,
    });
};

export const useGetDetailLuckyWheelWinner = () => {
    return useClientHimaQuery({
        name: ['luckyWheelWinnerDetail'],
        path: API_BASE_URL + "/client/lucky-wheel/list-client-prize-winners",
        method: 'GET',
        refetchInterval: 60000,
    });
};
