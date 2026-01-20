import { useClientHimaQuery } from '@/hooks/useClientHimaQuery';
import { API_BASE_URL, CLIENT_GET_FLASH_SALES } from '../constant';

export const useGetFlashSales = () => {
    return useClientHimaQuery({
        name: 'getFlashSalesClient',
        path: API_BASE_URL + CLIENT_GET_FLASH_SALES,
        method: 'GET',
    });
};

export const useGetFlashSaleById = (id) => {
    return useClientHimaQuery({
        name: ['getFlashSaleById', id],
        path: `${API_BASE_URL}${CLIENT_GET_FLASH_SALES}/${id}`,
        method: 'GET',
    });
};

export const useGetUserByInFlashSale = (enableQuery) => {
    return useClientHimaQuery({
        name: 'getUserByInFlashSale',
        path: `${API_BASE_URL}/client/flash-sales/user`,
        method: 'GET',
        enabled: enableQuery,
    });
};