import type React from "react"
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import { Button, Link } from "@nextui-org/react"
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { hasErrorField } from "../../utils/has-error-field"
import ErrorMessage from "../../components/error-message"

/*
прям из этого компонента можем менять 
либо вход 
либо регистрация
и когда зарегестрировались, должны поменять на вход (таб)
*/

type Login = {
  email: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

const Login: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  //apihe4ka для входа
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  //после логина запрос текущего пользователя
  const [triggerCurrentCuery] = useLazyCurrentQuery()

  //unwrap - чтобы если ошибка упала в кетч

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentCuery().unwrap()
      navigate("/")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Нет аккаунта? {/* линк не роута, переключает с логина на регистр*/}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => {
            setSelected("sign-up")
          }}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}

export default Login
