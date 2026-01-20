import api from '@/utils/interceptors';
import { API_BASE_URL, CLIENT_GET_PROFILE } from '../constant';
import useStore from '@/stores/clientStore';


export async function getProfile() {
    try {
        const response = await api.get(API_BASE_URL + CLIENT_GET_PROFILE);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

export async function changePassword(newPassword, oldPassword) {
    try {
        const response = await api.put(`${API_BASE_URL}/client/password`, {
            newPassword,
            oldPassword
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update password:', error);
        throw error;
    }
}

export async function updateProfile(data) {
    try {
        const response = await api.put(API_BASE_URL + CLIENT_GET_PROFILE, data);
        const profile = await getProfile();
        useStore.getState().setUserProfile(profile?.result);
        return response.data;
    } catch (error) {
        console.error('Failed to update profile:', error);
        throw error;
    }
}

export async function submitPhoneCard(carrier, cardNumber, serialNumber, value) {
    try {
        const response = await api.post(`${API_BASE_URL}/client/phone-card`, {
            carrier,
            cardNumber,
            serialNumber,
            value
        });

        const profile = await getProfile();
        useStore.getState().setUserProfile(profile?.result);

        return response.data;
    } catch (error) {
        console.error('Failed to submit phone card:', error);
        throw error;
    }
}

export async function submitRequestDiamondWithdrawal(diamondValue, idInGame) {
    try {
        const response = await api.post(`${API_BASE_URL}/client/diamond`, {
            diamondValue,
            idInGame,
        });

        const profile = await getProfile();
        useStore.getState().setUserProfile(profile?.result);

        return response.data;
    } catch (error) {
        console.error('Failed to submit diamond withdrawal:', error);
        throw error;
    }
}