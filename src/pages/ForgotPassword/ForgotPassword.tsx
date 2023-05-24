import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useEffect } from 'react';
import styles from './forgotPassword.module.css';
import { userForgotPassword } from '../../services/thunks/auth';
import { Form } from '../../components/Form/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { useForm } from '../../hooks/useForm';
import { Text } from '../../components/Text/Text';
import { EmailInput } from '../../components/inputs';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPasswordPatch = useSelector(state => state.auth.user.passwordPatch)
  const { values, handleChange, handleError } = useForm({
    email: {
      error: false,
      data: ''
    }
  });

  useEffect(() => {
    if(userPasswordPatch) navigate('/reset-password')
  }, [navigate, userPasswordPatch])

  const handleForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(userForgotPassword(values.email.data));
  }
  
  return (
    <main className={styles.forgotPassword}>
      <section className={styles.forgotPassword__section}>
        <Form title={'Восстановление пароля'} onSubmit={handleForm}>
          <EmailInput 
            name={'email'}
            error={values.email.error}
            value={values.email.data}
            onChange={handleChange}
            onInputError={handleError}
            placeholder="Укажите Email"
            />
          <Button 
            htmlType="submit" 
            type="primary"
            disabled={values.email.data.length < 7 || values.email.error}>
              Восстановить
          </Button>
        </Form>
        <div className={`${styles.forgotPassword__textContent} text text_type_main-default`}>
          <Text As='p' textSize='default'>
            Вспомнили пароль? <Link to={'/login'}>Войти</Link>
          </Text>
        </div>
      </section>
    </main>
  )
}