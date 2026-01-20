import { useHimaQuery } from "@/hooks/useHimaQuery";
import api from "@/utils/interceptors";
import { useMutation, useQueryClient } from "react-query";
import {
  ADMIN_FLASH_SALES,
  API_BASE_URL,
} from "./constant";

export function useGetFlashSales(queryKey) {
  return useHimaQuery({
    name: ["flashSales", queryKey],
    path: API_BASE_URL + ADMIN_FLASH_SALES,
    method: 'GET',
    params: queryKey,
  });
}

const addFlashSale = async (data) => {
  const response = await api.post(API_BASE_URL + ADMIN_FLASH_SALES, data);
  return response.data;
};

export const useAddFlashSale = () => {
  const queryClient = useQueryClient();

  return useMutation(addFlashSale, {
    onSuccess: () => {
      queryClient.invalidateQueries("flashSales");
    },
  });
};

const updateFlashSale = async ({ id, data }) => {
  const response = await api.patch(
    `${API_BASE_URL}${ADMIN_FLASH_SALES}/${id}`,
    data
  );
  return response.data;
};

export const useUpdateFlashSale = () => {
  const queryClient = useQueryClient();

  return useMutation(updateFlashSale, {
    onSuccess: () => {
      queryClient.invalidateQueries("flashSales");
    },
  });
};

export const useGetFlashSaleById = (id, enabledQuery) => {
  return useHimaQuery({
    name: ["flashSale", id],
    path: API_BASE_URL + ADMIN_FLASH_SALES + "/" + id,
    method: 'GET',
    enabled: enabledQuery,
  });
};

const removeFlashSale = async (id) => {
  const response = await api.delete(`${API_BASE_URL}${ADMIN_FLASH_SALES}/${id}`);
  return response.data;
};

export const useRemoveFlashSale = () => {
  const queryClient = useQueryClient();

  return useMutation(removeFlashSale, {
    onSuccess: () => {
      queryClient.invalidateQueries("flashSales");
    },
  });
};