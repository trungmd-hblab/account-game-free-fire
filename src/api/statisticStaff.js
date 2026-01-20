import { useHimaQuery } from "@/hooks/useHimaQuery"
import { API_BASE_URL, STAFF_REQUESTS, STAFF_STATISTIC } from "./constant"

export const useGetStatisticStaff = () => {
    return useHimaQuery({
        name: ["statisticStaff"],
        path: API_BASE_URL + STAFF_STATISTIC,
        method: 'GET',
    })
}

export const useGetStaffRequests = (params) => {
    return useHimaQuery({
        name: ["staffRequests", params],
        path: API_BASE_URL + STAFF_REQUESTS,
        params: params,
        method: 'GET',
    })
}