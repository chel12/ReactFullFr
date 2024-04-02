import type React from "react"
import type { IconType } from "react-icons"
//иконка лайки и комментария, их кол-во
type Props = {
  count: number
  Icon: IconType
}

const MetaInfo: React.FC<Props> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cusor-pointer">
      {count > 0 && (
        <p className="font-semibold text-default-400 text-1">{count}</p>
      )}
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
    </div>
  )
}

export default MetaInfo
