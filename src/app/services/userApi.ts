import type { User } from "../types/types"
import { api } from "./api"
/*
апи для юзера инжектится к ранне созданному api 
для get просто билдер
для типа пост и делит мутатион пишем
описываем типы
userData - это email: string; password: string
*/
export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<
      {
        email: string
        password: string
        name: string
      },
      {
        email: string
        password: string
        name: string
      }
    >({
      query: userData => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    getuserById: builder.query<User, string>({
      query: id => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
})

//хуки от RTK query
export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetuserByIdQuery,
  useLazyGetuserByIdQuery,
  useUpdateUserMutation,
} = userApi

//энтпоины
export const {
  endpoints: { login, register, current, getuserById, updateUser },
} = userApi
