import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/userSlice/userSlice"

import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../constants/constants"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { CountInfo } from "../../components/count-info"
import { useEffect } from "react"

const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  //модалка
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const dispatch = useAppDispatch()
  //при удаление компонента
  useEffect(() => {
    dispatch(resetUser())
  }, [])

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
      }
    } catch (error) {}
    
  }

  if (!data) {
    return null
  }
  return (
    <>
      <GoBack />
      <div className="flex items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />

          <div className="flex flex-col text-2xl font-bold gap-4 item-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />}>Редактировать</Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-5 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email}></ProfileInfo>
          <ProfileInfo
            title="Местоположение"
            info={data.location}
          ></ProfileInfo>
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          ></ProfileInfo>
          <ProfileInfo title="Обо мне" info={data.bio}></ProfileInfo>
          <div className="flex gap-2">
            <CountInfo title="Подписчики" count={data.followers.length} />
            <CountInfo title="Подписки" count={data.following.length} />
          </div>
        </Card>
      </div>
    </>
  )
}

export default UserProfile
