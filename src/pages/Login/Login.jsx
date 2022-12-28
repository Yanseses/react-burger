import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Form } from '../../components/Form/Form';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuth, userRefreshToken } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';

export default function Login(){
  const history = useHistory();
  const dispatch = useDispatch();
  const { userAuthorized } = useSelector(store => store.auth.userAuthorized);
  const [ loginForm, setLoginForm ] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if(!userAuthorized && getCookie('token') !== undefined){
      dispatch(userRefreshToken())
    }
  }, []);

  const onChange = e => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  const handleLoginForm = (e) => {
    e.preventDefault();

    dispatch(userAuth(loginForm));
  }

  if(getCookie('token') !== undefined){
    history.goBack()
  }

  return (
    <main className={styles.login}>
      <section className={styles.login__section}>
        <Form title={'Вход'} onSubmit={handleLoginForm}>
          <EmailInput
            type={'text'}
            onChange={onChange}
            value={loginForm.email}
            placeholder={'E-mail'}
            name={'email'}
            size={'default'}
            />
          <PasswordInput 
            name={'password'} 
            value={loginForm.password} 
            onChange={onChange}
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