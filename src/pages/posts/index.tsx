import React from "react"
import { useGetAllPostsQuery } from "../../app/services/postsApi"
import CreatePost from "../../components/create-post"

const Posts = () => {
  //сразу идёт запрос
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
    </>
  )
}

export default Posts
