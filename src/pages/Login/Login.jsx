import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Form } from '../../components/Form/Form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAuth } from '../../services/actions/auth';

export default function Login(){
  const history = useHistory();
  const dispatch = useDispatch();
  const userAuthorized = useSelector(store => store.auth.userAuthorized);
  const [ loginForm, setLoginForm ] = useState({
    email: '',
    password: ''
  });

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

  if(userAuthorized){
    history.goBack();
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