import { useClientHimaQuery } from '@/hooks/useClientHimaQuery';
import { API_BASE_URL, CLIENT_GET_CARDS, CLIENT_GET_GUIDE } from '../constant';

export const useGetListCardsByCategoryId = (queryKey, enabledQuery) => {
    return useClientHimaQuery({
        name: ['listCards', queryKey],
        path: API_BASE_URL + CLIENT_GET_CARDS,
        method: 'GET',
        params: queryKey,
        enabled: enabledQuery,
    });
};

export const useGetGuideByCategoryId = (id, enabledQuery) => {
    return useClientHimaQuery({
        name: ['guideByCategoryId', id],
        path: API_BASE_URL + CLIENT_GET_GUIDE + id,
        method: 'GET',
        enabled: enabledQuery,
    });
};