import { useHimaQuery } from "@/hooks/useHimaQuery";
import api from "@/utils/interceptors";
import { useMutation, useQueryClient } from "react-query";
import { ADMIN_LUCKY_WHEEL, ADMIN_LUCKY_WHEEL_HISTORY, API_BASE_URL } from "./constant";

export function useGetLuckyWheels(queryKey) {
  return useHimaQuery({
    name: ["useGetLuckyWheels", queryKey],
    path: API_BASE_URL + ADMIN_LUCKY_WHEEL,
    method: 'GET',
    params: queryKey,
  });
}

export const useGetLuckyWheelById = (id, enabledQuery) => {
  return useHimaQuery({
    name: ["luckyWheel", id],
    path: `${API_BASE_URL}${ADMIN_LUCKY_WHEEL}/${id}`,
    method: 'GET',
    enabled: enabledQuery,
  });
};

export function useGetLuckyWheelHistories(queryKey) {
  return useHimaQuery({
    name: ["luckyWheelHistories", queryKey],
    path: API_BASE_URL + ADMIN_LUCKY_WHEEL_HISTORY,
    method: 'GET',
    params: queryKey,
  });
}

const addLuckyWheel = async (data) => {
  const response = await api.post(API_BASE_URL + ADMIN_LUCKY_WHEEL, data);
  return response.data;
};

export const useAddLuckyWheel = () => {
  const queryClient = useQueryClient();

  return useMutation(addLuckyWheel, {
    onSuccess: () => {
      queryClient.invalidateQueries("useGetLuckyWheels");
    },
  });
};

const updateLuckyWheel = async ({ id, data }) => {
  const response = await api.patch(
    `${API_BASE_URL}${ADMIN_LUCKY_WHEEL}/${id}`,
    data
  );
  return response.data;
};

export const useUpdateLuckyWheel = () => {
  const queryClient = useQueryClient();

  return useMutation(updateLuckyWheel, {
    onSuccess: () => {
      queryClient.invalidateQueries("useGetLuckyWheels");
    },
  });
};

const removeLuckyWheel = async (id) => {
  const response = await api.delete(`${API_BASE_URL}${ADMIN_LUCKY_WHEEL}/${id}`);
  return response.data;
};

export const useRemoveLuckyWheel = () => {
  const queryClient = useQueryClient();

  return useMutation(removeLuckyWheel, {
    onSuccess: () => {
      queryClient.invalidateQueries("useGetLuckyWheels");
    },
  });
};
