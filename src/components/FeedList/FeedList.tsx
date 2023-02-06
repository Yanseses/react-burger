import { FC, PropsWithChildren } from "react";
import styles from './feedList.module.css';

export const FeedList: FC<PropsWithChildren> = ({children}) => {

  return (
    <section className={styles.feedList}>
      <div className={styles.feedList__list}>
        { children }
      </div>
    </section>
  )
}