import api from "@/utils/interceptors";
import { API_BASE_URL } from "../constant";

export async function buyAccountGame(id) {
    try {
        const response = await api.post(`${API_BASE_URL}/client/game-account/${id}/purchase`);
        return response.data;
    } catch (error) {
        console.error('Failed to submit phone card:', error);
        throw error;
    }
}

export async function buyAccountGameFlashSale(index, id) {
    try {
        const response = await api.post(`${API_BASE_URL}/client/flash-sales/${id}/item/${index}`);
        return response.data;
    } catch (error) {
        console.error('Failed to buy account game flash sale:', error);
        throw error;
    }
}