import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "@/utils/interceptors";
import {
  ADMIN_GET_CLIENTS,
  ADMIN_GET_HISTORY_TRANS_CLIENT,
  ADMIN_UPDATE_CLIENTS,
  API_BASE_URL,
} from "@/api/constant";
import { useHimaQuery } from "@/hooks/useHimaQuery";

const updateCustomer = async (id, data) => {
  const response = await api.put(
    `${API_BASE_URL + ADMIN_UPDATE_CLIENTS}/${id}`,
    data
  );
  return response.data;
};

export const useGetCustomers = (params, enabledQuery) => {
  return useHimaQuery({
    name: ["customers", params],
    path: API_BASE_URL + ADMIN_GET_CLIENTS,
    method: 'GET',
    params: params,
    enabled: enabledQuery,
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => updateCustomer(data.id, data.payload), {
    onSuccess: () => {
      queryClient.invalidateQueries("customers");
    },
  });
};

export const useGetTransactionHistory = (id, params) => {
  return useHimaQuery({
    name: ["transactionHistory", id, params],
    path: `${API_BASE_URL}${ADMIN_GET_HISTORY_TRANS_CLIENT}${id}/transaction-history`,
    method: 'GET',
    params: params,
    enabled: !!id,
  });
};