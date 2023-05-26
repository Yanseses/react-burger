import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './resetPassword.module.css';
import { Form } from '../../components/Form/Form';
import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { userResetPassword } from '../../services/thunks/auth';
import { useForm } from '../../hooks/useForm';
import { Text } from '../../components/Text/Text';
import { PasswordInput, Input } from '../../components/inputs';

export default function ResetPassword(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPasswordPatch = useSelector(store => store.auth.user.passwordPatch);
  const { values, handleChange, handleError } = useForm({
    password: {
      error: false,
      data: ''
    },
    token: {
      error: false,
      data: ''
    }
  });

  useEffect(() => {
    if(!userPasswordPatch) navigate('/forgot-password')
  }, [navigate, userPasswordPatch])

  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(userResetPassword({ password: values.password.data, token: values.token.data}));
  }

  return (
    <main className={styles.resetPassword}>
      <section className={styles.resetPassword__section}>
        <Form onSubmit={handleResetPassword}>
          <Text As='h3' textSize='medium'>Восстановление пароля</Text>
          <PasswordInput
            value={values.password.data}
            error={values.password.error}
            onInputError={handleError}
            onChange={handleChange}
            placeholder={'Введите новый пароль'}
            name={'password'} 
          />
          <Input
            name={'token'}
            error={values.token.error}
            value={values.token.data}
            onInputError={handleError}
            onChange={handleChange}
            placeholder={'Введите код из письма'}
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