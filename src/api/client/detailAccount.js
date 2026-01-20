import { useClientHimaQuery } from '@/hooks/useClientHimaQuery';
import { API_BASE_URL, CLIENT_GET_CARDS } from '../constant';

export const useGetDetailAccount = (id) => {
    return useClientHimaQuery({
        name: ['accountDetail', id],
        path: `${API_BASE_URL + CLIENT_GET_CARDS}/${id}`,
        method: 'GET',
        enabled: !!id,
    });
};