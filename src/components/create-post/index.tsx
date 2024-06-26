import React from "react"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postsApi"
import { Controller, useForm } from "react-hook-form"
import { Button, Textarea } from "@nextui-org/react"
import ErrorMessage from "../error-message"
import { IoMdCreate } from "react-icons/io"

const CreatePost = () => {
  //rtk query хук запроса
  const [createPost] = useCreatePostMutation()
  //rtk хук апи вызова
  const [triggerAllPosts] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string
  const onSubmit = handleSubmit(async data => {
    try {
      //когда мы создаём пост
      await createPost({ content: data.post }).unwrap()
      //если все хорошо обнуляем
      setValue("post", "")
      //затем тригер который вызывает все посты
      await triggerAllPosts().unwrap()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      {" "}
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder=" о чем думаете?"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить пост
      </Button>
    </form>
  )
}

export default CreatePost
