/*
process.env.NODE_ENV системная переменная
переопределять не надо
при разработке она - деволпмент
при сборке - продакшн
*/
export const BASE_URL =
  process.env.NODE_ENV === "production" ? "none" : "http://localhost:3000"
