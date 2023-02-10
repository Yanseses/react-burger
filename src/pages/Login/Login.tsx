import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { FormEvent } from 'react';
import { Form } from '../../components/Form/Form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userAuth } from '../../services/thunks/auth';
import { useForm } from '../../hooks/useForm';
import { Text } from '../../components/Text/Text';

export default function Login(){
  const history = useHistory();
  const dispatch = useDispatch();
  const userAuthorized = useSelector(store => store.auth.userAuthorized);
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const handleLoginForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(userAuth(values));
  }

  if(userAuthorized){
    history.goBack();
  }

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
          <Button htmlType="submit" type="primary">Войти</Button>
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
    </main>
  )
}