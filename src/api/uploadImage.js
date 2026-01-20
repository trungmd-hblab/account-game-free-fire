import api from "@/utils/interceptors";
import { API_BASE_URL, UPLOAD_IMG } from "./constant";

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await api.post(API_BASE_URL + UPLOAD_IMG, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response?.data?.result?.name;
  };