import { useClientHimaQuery } from "@/hooks/useClientHimaQuery";
import { API_BASE_URL } from "../constant";

export const useGetClientsLucky = () => {
    return useClientHimaQuery({
        name: ['getClientsLucky'],
        path: API_BASE_URL + "/client/game-account/client-lucky",
        method: 'GET',
    });
};