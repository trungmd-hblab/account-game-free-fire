import { useHimaQuery } from "@/hooks/useHimaQuery";
import { ADMIN_GET_STAFFS, ADMIN_REQUEST, API_BASE_URL, STAFF_REQUESTS } from "./constant";
import { useMutation, useQueryClient } from "react-query";
import api from "@/utils/interceptors";

export const useGetStaffs = (params, enabledQuery) => {
  return useHimaQuery({
    name: ["staffs", params],
    path: API_BASE_URL + ADMIN_GET_STAFFS,
    method: "GET",
    params: params,
    enabled: enabledQuery,
  });
};

// enpoint dưới này đang chưa đúng, cái đúng là lấy danh sách tài khoản đã bán của ctv
export const useGetStaffsRevenue = (id, params) => {
  return useHimaQuery({
    name: ["staffsRevenue", id, params],
    path: API_BASE_URL + ADMIN_GET_STAFFS + "/" + id,
    method: "GET",
    params: params,
    enabled: !!id,
  });
};

export function useGetStaffsRequest(queryKey) {
  return useHimaQuery({
    name: ["staffsRequest", queryKey],
    path: API_BASE_URL + STAFF_REQUESTS,
    method: "GET",
    params: queryKey,
  });
}

const updateStatusOrder = async ({ id, newData }) => {
  const response = await api.put(
    `${API_BASE_URL}${ADMIN_REQUEST}/${id}/status`,
    newData
  );
  return response.data;
};

export const useUpdateStatusOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(updateStatusOrder, {
    onSuccess: () => {
      queryClient.refetchQueries("staffsRequest", { active: true });
    },
  });
};

const addStaff = async (data) => {
  const response = await api.post(
    API_BASE_URL + ADMIN_GET_STAFFS,
    data
  );
  return response.data;
};

export const useAddStaff = () => {
  const queryClient = useQueryClient();

  return useMutation(addStaff, {
    onSuccess: () => {
      queryClient.invalidateQueries("staffs");
    },
  });
};

const updateStaff = async ({ id, data }) => {
  const response = await api.put(
    API_BASE_URL + ADMIN_GET_STAFFS + "/" + id,
    data
  );
  return response.data;
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation(updateStaff, {
    onSuccess: () => {
      queryClient.invalidateQueries("staffs");
    },
  });
};

const requestOfStaff = async (data) => {
  const response = await api.post(
    API_BASE_URL + STAFF_REQUESTS,
    data
  );
  return response.data;
};

export const useRequestOfStaff = () => {
  const queryClient = useQueryClient();

  return useMutation(requestOfStaff, {
    onSuccess: () => {
      queryClient.refetchQueries("staffRequests", { active: true });
      queryClient.refetchQueries("getAdminProfile", { active: true });
    },
  });
};

export const useGetListStaff = (params) => {
  return useHimaQuery({
    name: ["listStaff", params],
    path: API_BASE_URL + ADMIN_GET_STAFFS,
    method: "GET",
    params: params,
  });
};

