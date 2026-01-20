import { useClientHimaQuery } from "@/hooks/useClientHimaQuery";
import { API_BASE_URL } from "../constant";

export const useFetchClientConfig = () => {
  return useClientHimaQuery({
    name: 'fetchClientConfig',
    path: `${API_BASE_URL}/client/config`,
    method: 'GET',
  });
};