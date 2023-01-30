import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent } from 'react';
import styles from './forgotPassword.module.css';
import { userForgotPassword } from '../../services/thunks/auth';
import { Form } from '../../components/Form/Form';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { useForm } from '../../hooks/useForm';

export default function ForgotPassword(){
  const dispatch = useDispatch();
  const userPasswordPatch: any = useSelector<any>(state => state.auth.userPasswordPatch)
  const { values, handleChange } = useForm({
    email: ''
  });

  const handleForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // @ts-ignore
    dispatch(userForgotPassword(values.email));
  }

  if(userPasswordPatch){
    return (
      <Redirect to='/reset-password' />
    )
  }

  return (
    <main className={styles.forgotPassword}>
      <section className={styles.forgotPassword__section}>
        <Form title={'Восстановление пароля'} onSubmit={handleForm}>
          <EmailInput
            name={'email'}
            value={values.email}
            onChange={handleChange}
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