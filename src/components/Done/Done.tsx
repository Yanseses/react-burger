import { FC } from "react";
import { Text } from "../Text/Text";

interface IDone {
  title: string,
  total?: number
}

export const Done: FC<IDone> = ({ title, total = 0 }) => {
  return (
    <>
      <Text As='p' textSize='medium'>{title}</Text>
      <Text As='p' numberSize='large'>{total}</Text>
    </>
  )
}