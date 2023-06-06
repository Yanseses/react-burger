import classNames from "classnames";
import styles from './counter.module.css';
import { FC } from "react";

interface ICounter {
  count: number;
  size?: 'default' | 'small';
  extraClass?: string;
}

export const Counter: FC<ICounter> = ({ count, size = 'default', extraClass }) => {
  const counterClass = classNames(
    styles.counter,
    size && styles[size],
    extraClass
  )

  return (
    <div className={counterClass}>
      <p className={styles.counter__num}>{count}</p>
    </div>
    )
}