import type React from "react"
import { User as NextUiUser } from "@nextui-org/react"
import { BASE_URL } from "../../constants/constants"
//просто у них уже есть такой компонент
//а я проброшу туда всё остальное
type Props = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

const User: React.FC<Props> = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}) => {
  return (
    <NextUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  )
}

export default User
