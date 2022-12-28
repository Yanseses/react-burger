import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { Form } from '../../components/Form/Form';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { userRegister } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';

export default function Register(){
  const dispatch = useDispatch();
  const [ registerForm, setRegisterForm ] = useState({
    email: '',
    password: '',
    name: ''
  });

  const onChange = e => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(userRegister(registerForm))
  }

  if(getCookie('token') !== undefined){
    return (
      <Redirect to={{
        pathname: '/'
      }}/>
    )
  }

  return (
    <main className={styles.register}>
      <section className={styles.register__section}>
        <Form title={'Регистрация'} onSubmit={handleRegister}>
          <Input
            value={registerForm.name}
            onChange={onChange}
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            size={'default'}
          />
          <EmailInput
            value={registerForm.email}
            onChange={onChange}
            placeholder={'E-mail'}
            name={'email'}
            isIcon={false}
          />
          <PasswordInput 
            name={'password'} 
            value={registerForm.password}
            onChange={onChange}
          />
          <Button htmlType="submit" type="primary">Зарегистрироваться</Button>
        </Form>
        <div className={`${styles.register__textContent} text text_type_main-default`}>
          <p className={styles.register__textLine}>
            Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
          </p>
        </div>
      </section>
    </main>
  )
}