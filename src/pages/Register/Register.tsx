import { Button } from '../../components/Button/Button';
import styles from './register.module.css';
import { Form } from '../../components/Form/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userRegister } from '../../services/thunks/auth';
import { useForm } from '../../hooks/useForm';
import { FormEvent, useEffect } from 'react';
import { Text } from '../../components/Text/Text';
import { EmailInput, PasswordInput, Input } from '../../components/inputs';
import { Loader } from '../../components/Loader/Loader';

export default function Register(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const request = useSelector(store => store.auth.registerUser.request);
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const { values, handleChange, handleError } = useForm({
    email: {
      error: false,
      data: ''
    },
    password: {
      error: false,
      data: ''
    },
    name: {
      error: false,
      data: ''
    }
  });

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(
      userRegister({ 
        email: values.email.data,
        password: values.password.data,
        name: values.name.data
      })
    )
  }

  useEffect(() => {
    if(userAuthorized) navigate('/')
  }, [navigate, userAuthorized])

  return (
    <main className={styles.register}>
      <section className={styles.register__section}>
        <Form onSubmit={handleRegister}>
          <Text As='h3' textSize='medium'>Регистрация</Text>
          <Input
            name={'name'}
            error={values.name.error}
            value={values.name.data}
            onChange={handleChange}
            onInputError={handleError}
            placeholder={'Имя'}
          />
          <EmailInput
            value={values.email.data}
            error={values.email.error}
            onInputError={handleError}
            onChange={handleChange}
            placeholder={'E-mail'}
            name={'email'}
          />
          <PasswordInput 
            name={'password'} 
            value={values.password.data}
            error={values.password.error}
            onInputError={handleError}
            onChange={handleChange}
          />
          <Button 
            htmlType="submit" 
            type="primary"
            disabled={(values.email.error || values.password.error || values.name.error) || (values.email.data.length < 1 || values.password.data.length < 5 || values.name.data.length < 1)}>
              Зарегистрироваться
          </Button>
        </Form>
        <div className={styles.register__textContent}>
          <Text As='p' textSize='default'>
            Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
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