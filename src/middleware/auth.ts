import { createListenerMiddleware } from "@reduxjs/toolkit"
import { userApi } from "../app/services/userApi"

export const listenerMiddleware = createListenerMiddleware()
//слушатель кидаем
listenerMiddleware.startListening({
  //что слушать
  matcher: userApi.endpoints.login.matchFulfilled,
  //что сделать
  effect: async (action, listenerApi) => {
    //все отмени
    listenerApi.cancelActiveListeners()

	 //но если там есть токен, тогда возьми его и запиши в локалстор
    if (action.payload.token) {
      localStorage.setItem("token",action.payload.token)
    }
  },
})
