import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './resetPassword.module.css';
import { Form } from '../../components/Form/Form';
import { FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userResetPassword } from '../../services/thunks/auth';
import { useForm } from '../../hooks/useForm';
import { Text } from '../../components/Text/Text';

export default function ResetPassword(){
  const dispatch = useDispatch();
  const userPasswordPatch = useSelector(store => store.auth.userPasswordPatch);
  const { values, handleChange } = useForm({
    password: '',
    token: ''
  })

  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
            errorText={'Ошибка заполняемых данных'}
            size={'default'}
          />
          <Button htmlType="submit" type="primary">Сохранить</Button>
        </Form>
        <div className={styles.resetPassword__textContent}>
          <Text As='p' textSize='default'>
            Вспомнили пароль? <Link to='/login'>Войти</Link>
          </Text>
        </div>
      </section>
    </main>
  )
}