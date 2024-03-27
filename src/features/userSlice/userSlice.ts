import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../app/types/types"
import { userApi } from "../../app/services/userApi"
import type { RootState } from "../../app/store"

interface InitialState {
  user: User | null
  isAuthenticated: boolean
  users: User[] | null
  current: User | null
  token?: string
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        //addmatcher автоматом отлавливает апи и меняет стейт
        //если в эндпоинте юзерАпи логин завершён,тогда выполни функцию
        //где стейт токен возьмется из экшена токен и аунтификацию сделай true
        userApi.endpoints.login.matchFulfilled,
        (state, action) => {
          state.token = action.payload.token
          state.isAuthenticated = true
        },
      )
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true
        state.current = action.payload
      })
      .addMatcher(
        userApi.endpoints.getuserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload
        },
      )
  },
})
export const { logout, resetUser } = slice.actions
export default slice.reducer
//селекторы
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const selectCurrent = (state: RootState) => state.user.current
export const selectUser = (state: RootState) => state.user.user
