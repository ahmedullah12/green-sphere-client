"use server";

import axiosInstance from "@/src/lib/AxiosInstance"

export const getAdminOverviewData = async() => {
    const res = await axiosInstance.get("/overview");

    return res.data;
};