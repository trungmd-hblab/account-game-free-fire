import { useClientHimaQuery } from '@/hooks/useClientHimaQuery';
import { API_BASE_URL, CLIENT_GET_CATEGORY } from '../constant';

export const useGetCategories = (queryKey, enabledQuery) => {
    return useClientHimaQuery({
        name: ['categories', queryKey],
        path: API_BASE_URL + CLIENT_GET_CATEGORY,
        method: 'GET',
        params: queryKey,
        enabled: enabledQuery,
    });
};