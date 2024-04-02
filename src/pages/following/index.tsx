import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/userSlice/userSlice"
import { Link } from "react-router-dom"
import { Card, CardBody } from "@nextui-org/react"
import User from "../../components/user"

const Following = () => {
  const currentUser = useAppSelector(selectCurrent)
  if (!currentUser) {
    return null
  }
  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map(user => (
        <Link to={`/users/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1> У вас нет активных подписок</h1>
  )
}

export default Following
