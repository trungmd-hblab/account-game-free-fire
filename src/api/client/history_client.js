import { useHimaQuery } from '@/hooks/useHimaQuery';
import { API_BASE_URL } from '../constant';

export const useFetchTransactionHistory = (params) => {
    return useHimaQuery({
        name: ['fetchTransactionHistory', params],
        path: API_BASE_URL + '/client/money-balance-history',
        method: 'GET',
        params,
    });
};

export const useFetchGameAccounts = (params) => {
    return useHimaQuery({
        name: ['fetchGameAccounts', params],
        path: API_BASE_URL + '/client/game-account/my-game-accounts',
        method: 'GET',
        params,
    });
};

export const useFetchPhoneCardHistory = (params) => {
    return useHimaQuery({
        name: ['fetchPhoneCardHistory', params],
        path: API_BASE_URL + '/client/phone-card',
        method: 'GET',
        params,
    });
};

export const useFetchDiamondHistory = (params) => {
    return useHimaQuery({
        name: ['fetchDiamondHistory', params],
        path: API_BASE_URL + '/client/diamond',
        method: 'GET',
        params,
    });
};