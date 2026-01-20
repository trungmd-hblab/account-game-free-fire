import { useHimaQuery } from "@/hooks/useHimaQuery";
import { API_BASE_URL } from "../constant";
import api from "@/utils/interceptors";
import { getProfile } from "./profile";
import useStore from "@/stores/clientStore";

export const useGetEarnDiamond = (enabledQuery) => {
    return useHimaQuery({
        name: ['getEarnDiamond'],
        path: API_BASE_URL + '/client/my-attendance',
        method: 'GET',
        enabled: enabledQuery,
    });
};

export async function earnDiamond() {
    try {
        const response = await api.post(API_BASE_URL + '/client/my-attendance');

        const profile = await getProfile();
        useStore.getState().setUserProfile(profile?.result);

        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return error?.response?.data;
    }
}

