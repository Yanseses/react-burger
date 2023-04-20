import { FC } from "react";
import { Text } from "../Text/Text";
import styles from './done.module.css';

interface IDone {
  title: string,
  total?: number
}

export const Done: FC<IDone> = ({ title, total = 0 }) => {
  return (
    <div className={styles.done}>
      <Text As='p' textSize='medium'>{title}</Text>
      <Text As='p' numberSize='large'>{total}</Text>
    </div>
  )
}