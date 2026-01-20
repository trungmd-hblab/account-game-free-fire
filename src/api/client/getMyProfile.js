import { useHimaQuery } from "@/hooks/useHimaQuery";
import { ADMIN_GET_PROFILE, API_BASE_URL, CLIENT_GET_PROFILE } from "../constant";

export const useFetchClientProfile = (enabledQuery) => {
    return useHimaQuery({
        name: 'getMyProfile',
        path: API_BASE_URL + CLIENT_GET_PROFILE,
        method: 'GET',
        enabled: !!enabledQuery,
    });
};

export const useFetchAdminProfile = (enabledQuery) => {
    return useHimaQuery({
        name: 'getAdminProfile',
        path: API_BASE_URL + ADMIN_GET_PROFILE,
        method: 'GET',
        enabled: !!enabledQuery,
    });
};