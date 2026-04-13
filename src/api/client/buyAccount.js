import api from "@/utils/interceptors";
import { API_BASE_URL } from "../constant";

export async function buyAccountGame(id, paymentMethod = 'atm') {
    try {
        const response = await api.post(
            `${API_BASE_URL}/client/game-account/${id}/purchase`,
            { paymentMethod }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to submit phone card:', error);
        throw error;
    }
}

export async function buyAccountGameFlashSale(index, id, paymentMethod = 'atm') {
    try {
        const response = await api.post(
            `${API_BASE_URL}/client/flash-sales/${id}/item/${index}`,
            { paymentMethod }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to buy account game flash sale:', error);
        throw error;
    }
}