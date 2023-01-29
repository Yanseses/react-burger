import { FC } from "react";
import styles from './feedList.module.css';
import { FeedItem } from "./FeedItem/FeedItem";

export const FeedList: FC = () => {

  return (
    <section className={styles.feedList}>
      <ul className={styles.feedList__list}>
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
      </ul>
    </section>
  )
}