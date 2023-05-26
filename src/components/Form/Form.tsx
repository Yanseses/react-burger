import styles from './form.module.css';
import { FC, PropsWithChildren, FormEvent } from 'react';
import { Text } from '../Text/Text';

type TForm = {
  error?: string,
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export const Form: FC<PropsWithChildren<TForm>> = ({error, children, onSubmit}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
      { error && error.length > 0 && (error?.includes('401') ? (
        <Text As='p' textSize='default' color='error'>
          Не корректная комбинация логин/пароль
        </Text>
        ) : (
          <Text As='p' textSize='default' color='error'>
            Ошибка в заполнении данных. Попробуйте еще раз
          </Text>
          )
        )
      }
    </form>
  )
}