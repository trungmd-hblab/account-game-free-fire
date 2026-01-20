import { useHimaQuery } from "@/hooks/useHimaQuery";
import api from "@/utils/interceptors";
import { useMutation, useQueryClient } from "react-query";
import { ADMIN_CONFIGS, API_BASE_URL } from "./constant";

const saveConfig = async (data) => {
  const response = await api.post(API_BASE_URL + ADMIN_CONFIGS, data);
  return response.data;
};

export const useFetchConfig = () => {
  return useHimaQuery({
    name: ["configs"],
    path: API_BASE_URL + ADMIN_CONFIGS,
    method: 'GET',
  });
};

export const useSaveConfig = () => {
  const queryClient = useQueryClient();
  return useMutation(saveConfig, {
    onSuccess: () => {
      queryClient.invalidateQueries("configs");
    },
  });
};
