import { useHimaQuery } from "@/hooks/useHimaQuery";
import api from "@/utils/interceptors";
import { useMutation, useQueryClient } from "react-query";
import { ADMIN_ADD_TRAN, ADMIN_GET_TRANS, API_BASE_URL } from "./constant";

export function useGetTransactions(queryKey) {
  return useHimaQuery({
    name: ["transactions", queryKey],
    path: `${API_BASE_URL}${ADMIN_GET_TRANS}`,
    method: 'GET',
    params: queryKey,
  });
}

const addTransaction = async ({ id, data }) => {
  const response = await api.put(API_BASE_URL + ADMIN_ADD_TRAN + id + '/money', data);
  return response.data;
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation(addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });
};