import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants/constants"
import type { RootState } from "../store"

/*на какой сервер, базовая ссылка
при разработке он на локал хосте, но после он будет на серваке и чтобы потом не менять
 сделаю константу 
 Когда будет выполняться логин - будет прилетать токен в ответе
 его будем записывать и в локалстор и редакс стор
 поэтому делаем prepareHeaders (спец ключ слово в базе квери)
 */

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem("token")
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

//для повторнго запроса при неудаче
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

//включено кеширование и чтобы он перезапросилпри изменение пишем
//refetchOnMountOrArgChange=true

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
