/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse } from "axios"
import useAxiosInstance from "../http-instance"
import { ICreateExpense, IUpdateExpense, UseParams } from "@/types"
import API from "./constants"
import { IUpdateUser } from "@/types/user/user.type"

export const GetAllExpenses = async (
    userId: string,
    payload: UseParams
): Promise<AxiosResponse<ICreateExpense[]>> => {
    const axiosInstance = await useAxiosInstance()
    //
    const response = await axiosInstance(API.GET_EXPENSES.path(userId), {
        method: API.GET_EXPENSES.method,
        params: payload,
    })
    return response
}

export const GetExpense = async (userId: string, id: string): Promise<AxiosResponse<ICreateExpense>> => {
    const axiosInstance = await useAxiosInstance()
    //
    const response = await axiosInstance(API.GET_EXPENSE.path(userId, id), {
        method: API.GET_EXPENSE.method,
    })
    return response
}

export const CreateExpense = async (
    userId: string,
    userData: ICreateExpense
): Promise<AxiosResponse<ICreateExpense>> => {
    const axiosInstance = await useAxiosInstance()
    //
    const response = await axiosInstance(API.CREATE_EXPENSE.path(userId), {
        method: API.CREATE_EXPENSE.method,
        data: userData,
    })
    return response
}

export const UpdateExpense = async (
    userId: string,
    id: string,
    data: IUpdateUser
): Promise<AxiosResponse<IUpdateExpense>> => {
    const axiosInstance = await useAxiosInstance()
    //
    const response = await axiosInstance(API.UPDATE_EXPENSE.path(userId, id), {
        method: API.UPDATE_EXPENSE.method,
        data,
    })
    return response
}

export const DeleteExpense = async (
    userId: string,
    id: string,
): Promise<AxiosResponse<ICreateExpense>> => {
    const axiosInstance = await useAxiosInstance()
    //
    const response = await axiosInstance(API.REMOVE_EXPENSE.path(userId, id), {
        method: API.REMOVE_EXPENSE.method,
    })
    return response
}