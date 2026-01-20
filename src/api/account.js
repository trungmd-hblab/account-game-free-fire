import { useHimaQuery } from "@/hooks/useHimaQuery";
import api from "@/utils/interceptors";
import { useMutation, useQueryClient } from "react-query";
import { ADMIN_ADD_ACCOUNTS, ADMIN_GET_ACCOUNTS, API_BASE_URL } from "./constant";

export function useGetAccounts(queryKey) {
  return useHimaQuery({
    name: ["accounts_game", queryKey],
    path: API_BASE_URL + ADMIN_GET_ACCOUNTS,
    method: 'GET',
    params: queryKey,
  });
}

export const useGetAccountGameById = (id, enabledQuery) => {
  return useHimaQuery({
    name: ["account", id],
    path: API_BASE_URL + ADMIN_GET_ACCOUNTS + '/' + id,
    method: 'GET',
    enabled: enabledQuery,
  });
};

const addAccount = async (data) => {
  const response = await api.post(API_BASE_URL + ADMIN_GET_ACCOUNTS, data);
  return response.data;
};

export const useAddAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(addAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries("accounts_game");
    },
  });
};

const updateAccount = async ({ id, data }) => {
  const response = await api.patch(
    `${API_BASE_URL}${ADMIN_GET_ACCOUNTS}/${id}`,
    data
  );
  return response.data;
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(updateAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries("accounts_game");
    },
  });
};

const removeAccount = async (id) => {
  const response = await api.delete(`${API_BASE_URL}${ADMIN_GET_ACCOUNTS}/${id}`);
  return response.data;
};

export const useRemoveAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(removeAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries("accounts_game");
    },
  });
};


const addAccounts = async (data) => {
  const response = await api.post(API_BASE_URL + ADMIN_ADD_ACCOUNTS, data);
  return response.data;
};

export const useAddAccounts = () => {
  const queryClient = useQueryClient();

  return useMutation(addAccounts, {
    onSuccess: () => {
      queryClient.invalidateQueries("accounts_game");
    },
  });
};
