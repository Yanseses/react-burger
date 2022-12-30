import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgotPassword.module.css';
import { userForgotPassword } from '../../services/actions/auth';
import { Form } from '../../components/Form/Form';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';

export default function ForgotPassword(){
  const dispatch = useDispatch();
  const userPasswordPatch = useSelector(state => state.auth.userPasswordPatch)
  const [ emailForm, setEmailForm ] = useState('');

  const handleForm = (e) => {
    e.preventDefault()

    dispatch(userForgotPassword(emailForm));
  }

  if(getCookie('token')){
    return (
      <Redirect to='/' />
    )
  }

  if(userPasswordPatch){
    return (
      <Redirect to='/reset-password' />
    )
  }

  return (
    <main className={styles.forgotPassword}>
      <section className={styles.forgotPassword__section}>
        <Form title={'Восстановление пароля'} onSubmit={handleForm}>
          <EmailInput
            name={'email'}
            value={emailForm}
            onChange={(e) => setEmailForm(e.target.value)}
            placeholder="Укажите Email"
            isIcon={false}
          />
          <Button htmlType="submit" type="primary">Восстановить</Button>
        </Form>
        <div className={`${styles.forgotPassword__textContent} text text_type_main-default`}>
          <p className={styles.forgotPassword__textLine}>
            Вспомнили пароль? <Link to={'/login'}>Войти</Link>
          </p>
        </div>
      </section>
    </main>
  )
}