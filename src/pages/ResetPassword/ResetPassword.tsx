import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './resetPassword.module.css';
import { Form } from '../../components/Form/Form';
import { FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userResetPassword } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';

export default function ResetPassword(){
  const dispatch = useDispatch();
  const userPasswordPatch: any = useSelector<any>(store => store.auth.userPasswordPatch);
  const { values, handleChange } = useForm({
    password: '',
    token: ''
  })

  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
// @ts-ignore
    dispatch(userResetPassword(values));
  }

  if(!userPasswordPatch){
    return (
      <Redirect to={{
        pathname: '/forgot-password'
      }}/>
    )
  }

  return (
    <main className={styles.resetPassword}>
      <section className={styles.resetPassword__section}>
        <Form title={'Восстановление пароля'} onSubmit={handleResetPassword}>
          <PasswordInput
            value={values.password}
            onChange={handleChange}
            placeholder={'Введите новый пароль'}
            name={'password'} 
          />
          <Input
            value={values.token}
            onChange={handleChange}
            type={'text'}
            placeholder={'Введите код из письма'}
            name={'token'}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType="submit" type="primary">Сохранить</Button>
        </Form>
        <div className={`${styles.resetPassword__textContent} text text_type_main-default`}>
          <p className={styles.resetPassword__textLine}>
          Вспомнили пароль? <Link to='/login'>Войти</Link>
          </p>
        </div>
      </section>
    </main>
  )
}