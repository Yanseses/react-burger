import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgotPassword.module.css';
import { userForgotPassword } from '../../services/actions/auth';
import { Form } from '../../components/Form/Form';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ForgotPassword(){
  const dispatch = useDispatch();
  const [ emailForm, setEmailForm ] = useState('');

  const handleForm = (e) => {
    e.preventDefault()

    dispatch(userForgotPassword(emailForm))
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