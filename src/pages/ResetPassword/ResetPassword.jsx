import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './resetPassword.module.css';
import { Form } from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userResetPassword } from '../../services/actions/auth';

export default function ResetPassword(){
  const dispatch = useDispatch();
  const [ resetForm, setResetForm ] = useState({
    password: '',
    token: ''
  });

  const onChange = e => {
    setResetForm({
      ...resetForm,
      [e.target.name]: e.target.value
    })
  }

  const handleResetPassword = (e) => {
    e.preventDefault();

    dispatch(userResetPassword(resetForm));
  }

  return (
    <main className={styles.resetPassword}>
      <section className={styles.resetPassword__section}>
        <Form title={'Восстановление пароля'} onSubmit={handleResetPassword}>
          <PasswordInput
            value={resetForm.password}
            onChange={onChange}
            placeholder={'Введите новый пароль'}
            name={'password'} 
          />
          <Input
            value={resetForm.token}
            onChange={onChange}
            type={'text'}
            placeholder={'Введите код из письма'}
            name={'login'}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType="submit" type="primary">Сохранить</Button>
        </Form>
        <div className={`${styles.resetPassword__textContent} text text_type_main-default`}>
          <p className={styles.resetPassword__textLine}>
          Вспомнили пароль? <Link to='/login'>Войти</Link>
          </p>
        </div>
      </section>
    </main>
  )
}