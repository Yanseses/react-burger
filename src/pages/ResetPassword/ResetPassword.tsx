import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './resetPassword.module.css';
import { Form } from '../../components/Form/Form';
import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userResetPassword } from '../../services/thunks/auth';
import { useForm } from '../../hooks/useForm';
import { Text } from '../../components/Text/Text';
import { Input, PasswordInput } from '../../components/inputs';

export default function ResetPassword(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestError = useSelector(store => store.auth.dropPassword.error);
  const userPasswordPatch = useSelector(store => store.auth.user.passwordPatch);
  const { values, handleChange } = useForm({
    password: '',
    token: ''
  });

  useEffect(() => {
    if(!userPasswordPatch) navigate('/forgot-password')
  }, [navigate, userPasswordPatch])

  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(userResetPassword(values));
  }

  return (
    <main className={styles.resetPassword}>
      <section className={styles.resetPassword__section}>
        <Form title={'Восстановление пароля'} onSubmit={handleResetPassword} error={requestError}>
          <PasswordInput
            value={values.password}
            onChange={handleChange}
            placeholder={'Введите новый пароль'}
            name={'password'} 
          />
          <Input
            value={values.token}
            onChange={handleChange}
            type={'text'}
            placeholder={'Введите код из письма'}
            name={'token'}
          />
          <Button htmlType="submit" type="primary">Изменить пароль</Button>
        </Form>
        <div className={styles.resetPassword__textContent}>
          <Text As='p' textSize='default'>
            Вспомнили пароль? <Link to='/login'>Войти</Link>
          </Text>
        </div>
      </section>
    </main>
  )
}