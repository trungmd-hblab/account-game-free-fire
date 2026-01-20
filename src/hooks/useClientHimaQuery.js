import axios from "axios";
import { useQuery } from "react-query";

export const useClientHimaQuery = ({ name, path, method = 'GET', params, body, eventHandle, ...rest }) => {

    const fetchData = async () => {
        try {
            const config = {
                method,
                url: path,
                headers: {
                    'Content-Type': 'application/json',
                },
                params,
                data: (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') ? body : undefined,
            };

            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch data: ${error.message}`);
        }
    };

    return useQuery(
        name,
        fetchData,
        {
            ...eventHandle,
            cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            ...rest
        }
    );
};