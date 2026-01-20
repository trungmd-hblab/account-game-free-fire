import api from "@/utils/interceptors";
import { useMutation, useQueryClient } from "react-query";
import { ADMIN_GET_CARDS, API_BASE_URL } from "./constant";
import { useHimaQuery } from "@/hooks/useHimaQuery";

export function useGetCards(queryKey) {
  return useHimaQuery({
    name: ["cards", queryKey],
    path: API_BASE_URL + ADMIN_GET_CARDS,
    method: 'GET',
    params: queryKey,
  });
}

const updateStatusCard = async ({ id, newData }) => {
  const response = await api.put(
    `${API_BASE_URL}${ADMIN_GET_CARDS}/${id}/status`,
    newData
  );
  return response.data;
};

export const useUpdateStatusCard = () => {
  const queryClient = useQueryClient();

  return useMutation(updateStatusCard, {
    onSuccess: () => {
      queryClient.invalidateQueries("cards");
    },
  });
};


export const handleRequestPassword = async (email) => {
  const response = await api.post(API_BASE_URL + '/client/forgot-password', { email });
  return response.data;
};