import styles from './form.module.css';
import { FC, PropsWithChildren, FormEvent } from 'react';
import { Text } from '../Text/Text';

type TForm = {
  title?: string,
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export const Form: FC<PropsWithChildren<TForm>> = ({title, children, onSubmit}) => {
  return (
    <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
      { title && (
        <Text As='h3' textSize='medium'>{title}</Text>
        )
      }
      {children}
    </form>
  )
}