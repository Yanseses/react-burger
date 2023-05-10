import styles from './form.module.css';
import { FC, PropsWithChildren, FormEvent } from 'react';
import { Text } from '../Text/Text';

type TForm = {
  title?: string,
  error?: string,
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export const Form: FC<PropsWithChildren<TForm>> = ({title, error, children, onSubmit}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      { title && (
        <Text As='h3' textSize='medium'>{title}</Text>
        )
      }
      {children}
      { error && error.length > 0 && error?.includes('401') && (
        <Text As='p' textSize='default' color='error'>
          Не корректная комбинация логин/пароль
        </Text>
        )
      }
    </form>
  )
}