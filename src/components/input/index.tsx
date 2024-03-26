import { Input as NextInput } from "@nextui-org/react"
import type React from "react"
import { useController, type Control } from "react-hook-form"

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any> //для реакт хук форм
  required?: string //булиан значение или строка
  endContent?: JSX.Element
}

const Input: React.FC<Props> = ({
  control,
  label,
  name,
  endContent,
  placeholder,
  required = "",
  type,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })
  return (
    <NextInput
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value} //useController нужен
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
    />
  )
}

export default Input
