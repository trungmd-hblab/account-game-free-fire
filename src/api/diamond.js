import { useHimaQuery } from "@/hooks/useHimaQuery";
import api from "@/utils/interceptors";
import { useMutation, useQueryClient } from "react-query";
import { ADMIN_DIAMONDS, API_BASE_URL } from "./constant";

export function useGetDiamonds(queryKey) {
  return useHimaQuery({
    name: ["diamonds", queryKey],
    path: API_BASE_URL + ADMIN_DIAMONDS,
    method: 'GET',
    params: queryKey,
  });
}

const updateStatusDiamond = async ({ id, newData }) => {
  const response = await api.put(
    `${API_BASE_URL}${ADMIN_DIAMONDS}/${id}/status`,
    newData
  );
  return response.data;
};

export const useUpdateStatusDiamond = () => {
  const queryClient = useQueryClient();

  return useMutation(updateStatusDiamond, {
    onSuccess: () => {
      queryClient.invalidateQueries("diamonds");
    },
  });
};
