import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Form } from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAuth } from '../../services/actions/auth';

export default function Login(){
  const dispatch = useDispatch();
  const [ loginForm, setLoginForm ] = useState({
    email: '',
    password: ''
  });

  const handleLoginForm = (e) => {
    e.preventDefault();

    dispatch(userAuth(loginForm))
  }

  return (
    <main className={styles.login}>
      <section className={styles.login__section}>
        <Form title={'Вход'} onSubmit={handleLoginForm}>
          <EmailInput
            type={'text'}
            onChange={(e) => setLoginForm({
              ...loginForm,
              email: e.target.value
            })}
            value={loginForm.email}
            placeholder={'E-mail'}
            name={'login'}
            size={'default'}
            />
          <PasswordInput 
            name={'password'} 
            value={loginForm.password} 
            onChange={(e) => setLoginForm({
              ...loginForm,
              password: e.target.value
            })}
            />
          <Button htmlType="submit" type="primary">Войти</Button>
        </Form>
        <div className={`${styles.login__textContent} text text_type_main-default`}>
          <p className={styles.login__textLine}>
            Вы — новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
          </p>
          <p className={styles.login__textLine}>
            Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
          </p>
        </div>
      </section>
    </main>
  )
}