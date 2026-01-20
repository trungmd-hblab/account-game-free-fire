import api from "@/utils/interceptors";
import { useQuery } from "react-query";


export const useHimaQuery = ({ name, path, method = 'GET', params, body, eventHandle, ...rest }) => {

    const fetchData = async () => {
        const config = {
            method: method,
            url: path,
            headers: {
                'Content-Type': 'application/json',
            },
            params: params,
        };

        if (body && (method.toLowerCase() === 'post' || method.toLowerCase() === 'put')) {
            config.data = body;
        }

        const response = await api(config);
        return response.data;
    };

    return useQuery(
        name,
        fetchData,
        {
            ...eventHandle,
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            ...rest
        }
    );
};