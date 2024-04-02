type Props = {
  title: string
  info?: string
}

export const ProfileInfo: React.FC<Props> = ({ title, info }) => {
  //если нет, ничего не делай
  if (!info) {
    return null
  }
  return (
    <p className="font-semibols">
      <span className="text-gray-500 mr-2">{title}</span>
      {info}
    </p>
  )
}
