import { Button } from '../../components/Button/Button';
import styles from './login.module.css';
import { FormEvent, useEffect } from 'react';
import { Form } from '../../components/Form/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userAuth } from '../../services/thunks/auth';
import { useForm } from '../../hooks/useForm';
import { Text } from '../../components/Text/Text';
import { Loader } from '../../components/Loader/Loader';
import { EmailInput, PasswordInput } from '../../components/inputs';

export default function Login(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const request = useSelector(store => store.auth.authUser.request);
  const { values, handleChange, handleError } = useForm({
    email: {
      error: false,
      data: ''
    },
    password: {
      error: false,
      data: ''
    }
  });

  const handleLoginForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(userAuth({ email: values.email.data, password: values.password.data }));
  }

  useEffect(() => {
    if(userAuthorized) navigate('/profile');
  }, [navigate, userAuthorized]);

  return (
    <main className={styles.login}>
      <section className={styles.login__section}>
        <Form onSubmit={handleLoginForm}>
          <Text As='h3' textSize='medium'>Вход</Text>
          <EmailInput
            onChange={handleChange}
            onInputError={handleError}
            error={values.email.error}
            value={values.email.data}
            placeholder={'E-mail'}
            name={'email'}
            />
          <PasswordInput 
            name={'password'}
            value={values.password.data} 
            error={values.password.error}
            onChange={handleChange}
            onInputError={handleError}
            />
          <Button 
            htmlType="submit" 
            type="primary"
            disabled={(values.email.error || values.password.error) || (values.email.data.length < 1 || values.password.data.length < 5)}>
              Войти
          </Button>
        </Form>
        <div className={styles.login__textContent}>
          <div className={styles.login__textLine}>
            <Text As='p' textSize='default'>
              Вы — новый пользователь?
            </Text>
            <Link to={'/register'}>Зарегистрироваться</Link>
          </div>
          <div className={styles.login__textLine}>
          <Text As='p' textSize='default'>
            Забыли пароль?
          </Text>
          <Link to={'/forgot-password'}>Восстановить пароль</Link>
          </div>
        </div>
      </section>

      { request && (
        <Loader />  
        ) 
      }
    </main>
  )
}