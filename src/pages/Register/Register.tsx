import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { Form } from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userRegister } from '../../services/thunks/auth';
import { useForm } from '../../hooks/useForm';
import { FormEvent } from 'react';
import { Text } from '../../components/Text/Text';
import { EmailInput, Input, PasswordInput } from '../../components/inputs';

export default function Register(){
  const dispatch = useDispatch();
  const requestError = useSelector(store => store.auth.registerUser.error);
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: ''
  })

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(userRegister(values))
  }

  return (
    <main className={styles.register}>
      <section className={styles.register__section}>
        <Form title={'Регистрация'} onSubmit={handleRegister} error={requestError}>
        <Input
            value={values.name}
            onChange={handleChange}
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
          />
          <EmailInput
            value={values.email}
            onChange={handleChange}
            placeholder={'E-mail'}
            name={'email'}
            isIcon={false}
          />
          <PasswordInput 
            name={'password'} 
            value={values.password}
            onChange={handleChange}
          />
          <Button 
            htmlType="submit" 
            type="primary"
            disabled={values.name.length > 3 && values.password.length > 5 && values.email.length > 3 ? false : true}>
              Зарегистрироваться
          </Button>
        </Form>
        <div className={styles.register__textContent}>
          <Text As='p' textSize='default'>
            Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
          </Text>
        </div>
      </section>
    </main>
  )
}