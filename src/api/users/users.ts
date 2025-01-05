/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse } from "axios"
import { User } from "next-auth"
import useAxiosInstance from "../http-instance"
import API from "./constant"
import { UseParams } from "@/types"
import { ICreateUser, IUpdateUser } from "@/types/user/user.type"

export const GetAllUsers = async (
  payload: UseParams
): Promise<AxiosResponse<User[]>> => {
  const axiosInstance = await useAxiosInstance()
  //
  const response = await axiosInstance(API.GET_USERS.path, {
    method: API.GET_USERS.method,
    params: payload,
  })
  return response
}

export const GetUser = async (id: string): Promise<AxiosResponse<User>> => {
  const axiosInstance = await useAxiosInstance()
  //
  const response = await axiosInstance(API.GET_USER.path(id), {
    method: API.GET_USER.method,
  })
  return response
}

export const CreateUser = async (
  userData: ICreateUser
): Promise<AxiosResponse<User>> => {
  const axiosInstance = await useAxiosInstance()
  //
  const response = await axiosInstance(API.CREATE_USER.path, {
    method: API.CREATE_USER.method,
    data: userData,
  })
  return response
}

export const UpdateUser = async (
  id: string,
  data: IUpdateUser
): Promise<AxiosResponse<User>> => {
  const axiosInstance = await useAxiosInstance()
  //
  const response = await axiosInstance(API.UPDATE_USER.path(id), {
    method: API.UPDATE_USER.method,
    data,
  })
  return response
}