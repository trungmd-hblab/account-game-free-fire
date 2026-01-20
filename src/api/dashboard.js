import { useHimaQuery } from "@/hooks/useHimaQuery";
import { ADMIN_STATIC, ADMIN_TOP_CLIENT, API_BASE_URL } from "./constant";

export const useGetStatistic = (params) => {
  return useHimaQuery({
    name: ["Statistic", params],
    path: API_BASE_URL + ADMIN_STATIC,
    method: 'GET',
    params: params,
  });
};

export const useGetTopClient = () => {
  return useHimaQuery({
    name: "topClient",
    path: API_BASE_URL + ADMIN_TOP_CLIENT,
    method: 'GET',
  });
};