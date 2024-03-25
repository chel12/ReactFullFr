import { Button as NextButton } from "@nextui-org/react"

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}
const Button: React.FC<Props> = ({
  children,
  className,
  color,
  fullWidth,
  icon,
  type,
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </NextButton>
  )
}

export default Button
/* 
все это чтобы потом не писать свойста у кнопки из nextjs
1) ради двух дублей свойств
2) если next перестанут юзать, можно прям здесь все переопределить и всё будет работать 
 */
