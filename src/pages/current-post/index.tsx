import React from "react"
import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import Card from "../../components/card"
import { GoBack } from "../../components/go-back"

const CurrentPost = () => {
  //чтобы при переходе url адрес id:значение поста брать
  const params = useParams<{ id: string }>()
  //то есть сначала достать параметры и потом вызовем функцию
  //и она в data положит post текущий или пустую строку
  const { data } = useGetPostByIdQuery(params?.id ?? "")
  if (!data) {
    return <h2>Поста не существует</h2>
  }
  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likedByUser,
    createdAt,
  } = data

  return (
    <>
      <GoBack />
      <Card
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
    </>
  )
}

export default CurrentPost
