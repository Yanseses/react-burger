import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { FormEvent, useEffect } from 'react';
import { Form } from '../../components/Form/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userAuth } from '../../services/thunks/auth';
import { useForm } from '../../hooks/useForm';
import { Text } from '../../components/Text/Text';
import { Loader } from '../../components/Loader/Loader';

export default function Login(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(store => store.auth.authUser.error);
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const request = useSelector(store => store.auth.authUser.request);
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const handleLoginForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(userAuth(values));
  }

  useEffect(() => {
    if(userAuthorized) navigate('/profile');
  }, [navigate, userAuthorized]);

  return (
    <main className={styles.login}>
      <section className={styles.login__section}>
        <Form title={'Вход'} onSubmit={handleLoginForm}>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            placeholder={'E-mail'}
            name={'email'}
            size={'default'}
            />
          <PasswordInput 
            name={'password'}
            value={values.password} 
            onChange={handleChange}
            />
          <Button 
            htmlType="submit" 
            type="primary"
            disabled={
              values.email.length > 5 && values.password.length > 5 ? false : true
            }>
              Войти
          </Button>
          { error.length > 0 && (
            <Text As='p' textSize='default'>
              {error}
            </Text>
            ) 
          }
        </Form>
        <div className={styles.login__textContent}>
          <Text As='p' textSize='default'>
            Вы — новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
          </Text>
          <Text As='p' textSize='default'>
            Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
          </Text>
        </div>
      </section>

      { request && (
        <Loader />  
        ) 
      }
    </main>
  )
}