import api from "@/utils/interceptors";
import { trimFields } from "@/utils/trimMiddleware";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ADMIN_LOG_OUT,
  ADMIN_LOGIN,
  API_BASE_URL,
  CLIENT_CREATE,
  CLIENT_LOG_OUT,
  CLIENT_LOGIN,
} from "./constant";

export async function login(data) {
  const trimFieldsInData = trimFields(data);
  return await axios
    .post(API_BASE_URL + ADMIN_LOGIN, trimFieldsInData)
    .then((response) => {
      const { accessToken, refreshToken } = response.data?.result;
      Cookies.set("admin_accessToken", accessToken);
      Cookies.set("admin_refreshToken", refreshToken);
      Cookies.remove("client_accessToken");
      Cookies.remove("client_refreshToken");
      return response.data;
    })
    .catch((e) => console.error(e));
}

export async function logout() {
  let refreshToken = Cookies.get("admin_refreshToken");
  return await api
    .put(API_BASE_URL + ADMIN_LOG_OUT, {
      refreshToken: refreshToken,
    })
    .then((response) => {
      Cookies.remove("admin_accessToken");
      Cookies.remove("admin_refreshToken");
      Cookies.remove("isOwner");
    })
    .catch((error) => {
      Cookies.remove("admin_accessToken");
      Cookies.remove("admin_refreshToken");
      Cookies.remove("isOwner");
    });
}

export async function clientRegister(data) {
  return await axios.post(API_BASE_URL + CLIENT_CREATE, data);
}

export async function loginClient(data) {
  const trimFieldsInData = trimFields(data);
  return await axios
    .post(API_BASE_URL + CLIENT_LOGIN, trimFieldsInData)
    .then((response) => {
      const { accessToken, refreshToken } = response.data?.result;
      Cookies.set("client_accessToken", accessToken);
      Cookies.set("client_refreshToken", refreshToken);
      Cookies.remove("admin_accessToken");
      Cookies.remove("admin_refreshToken");
      return response.data;
    });
}

export async function logoutClient() {
  let refreshToken = Cookies.get("client_refreshToken");
  return await api
    .put(API_BASE_URL + CLIENT_LOG_OUT, {
      refreshToken: refreshToken,
    })
    .then((response) => {
      Cookies.remove("client_accessToken");
      Cookies.remove("client_refreshToken");
    })
    .catch((error) => {
      Cookies.remove("client_accessToken");
      Cookies.remove("client_refreshToken");
    });
}
