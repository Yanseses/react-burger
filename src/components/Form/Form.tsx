import styles from './form.module.css';
import { FC, PropsWithChildren } from 'react';
import { TForm } from '../../services/types';

export const Form: FC<PropsWithChildren<TForm>> = ({title, children, onSubmit}): JSX.Element => {
  return (
    <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
      { title && (
        <h2 className={`${styles.form__title} text text_type_main-medium`}>{title}</h2>
        )
      }
      {children}
    </form>
  )
}