import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { Form } from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../services/actions/auth';
import { useForm } from '../../hooks/useForm';

export default function Register(){
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: ''
  })

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(userRegister(values))
  }

  return (
    <main className={styles.register}>
      <section className={styles.register__section}>
        <Form title={'Регистрация'} onSubmit={handleRegister}>
          <Input
            value={values.name}
            onChange={handleChange}
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            size={'default'}
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