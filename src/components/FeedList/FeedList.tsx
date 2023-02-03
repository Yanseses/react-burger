import { FC, PropsWithChildren } from "react";
import styles from './feedList.module.css';

export const FeedList: FC<PropsWithChildren> = ({children}) => {

  return (
    <section className={styles.feedList}>
      <ul className={styles.feedList__list}>
        { children }
      </ul>
    </section>
  )
}