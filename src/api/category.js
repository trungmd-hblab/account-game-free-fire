import { useHimaQuery } from "@/hooks/useHimaQuery";
import api from "@/utils/interceptors";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ADMIN_CATEGORIES, ADMIN_CATEGORIES_DROPDOWN, API_BASE_URL } from "./constant";

export function useGetCategories(queryKey) {
  return useHimaQuery({
    name: ["categories", queryKey],
    path: API_BASE_URL + ADMIN_CATEGORIES,
    method: 'GET',
    params: queryKey,
  });
}

const addCategory = async (data) => {
  const response = await api.post(API_BASE_URL + ADMIN_CATEGORIES, data);
  return response.data;
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

const updateCategory = async ({ id, data }) => {
  const response = await api.patch(
    `${API_BASE_URL}${ADMIN_CATEGORIES}/${id}`,
    data
  );
  return response.data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export const useGetCategoryById = (id, enabledQuery) => {
  return useHimaQuery({
    name: ["category", id],
    path: `${API_BASE_URL}${ADMIN_CATEGORIES}/${id}`,
    method: 'GET',
    enabled: enabledQuery,
  });
};

const removeCategory = async (id) => {
  const response = await api.delete(`${API_BASE_URL}${ADMIN_CATEGORIES}/${id}`);
  return response.data;
};

export const useRemoveCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(removeCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export const useGetCateByType = (type) => {
  return useQuery(
    ["categoriesByType", type],
    async () => {
      const response = await api.get(`${API_BASE_URL}${ADMIN_CATEGORIES_DROPDOWN}`, {
        params: { type },
      });
      return response.data;
    }
  );
};