import { useEffect, FocusEvent } from "react";
import { useDispatch, useSelector } from "../../../services/hooks";
import { useForm } from "../../../hooks/useForm";
import styles from './user.module.css';
import { Form } from "../../../components/Form/Form";
import { EmailInput, PasswordInput, Input } from "../../../components/inputs";
import { changeUserData } from "../../../services/thunks/auth";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader/Loader";

export default function User(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const user = useSelector(store => store.auth.user.data);
  const request = useSelector(store => store.auth.changeUser.request)
  const { values, handleChange, handleError, setValues } = useForm({
    name: {
      error: false,
      data: ''
    },
    email: {
      error: false,
      data: ''
    },
    password: {
      error: false,
      data: ''
    }
  });

  useEffect(() => {
    setValues({
      name: {
        ...values.name,
        data: user.name
      },
      email: {
        ...values.email,
        data: user.email
      },
      password: {
        ...values.password,
        data: user.password ? user.password : ''
      }
    })
  }, [setValues, user]);

  useEffect(() => {
    if(!userAuthorized) navigate('/login')
  }, [navigate, userAuthorized])

  const handleFucusInput = (e: FocusEvent<HTMLInputElement>): void => {
    dispatch(changeUserData({
      name: values.name.data,
      email: values.email.data,
      password: values.password.data
      })
    );
  }
  
  return (
    <>
      <section className={styles.user}>              
        <Form>
          <Input
            isIcon
            name={'name'}
            placeholder={'Имя'}
            error={values.name.error}
            value={values.name.data}
            onChange={handleChange}            
            onInputError={handleError}
            onBlur={handleFucusInput}
          />
          <EmailInput
            value={values.email.data}
            name={'email'}
            error={values.email.error}
            onInputError={handleError}
            onChange={handleChange}
            onBlur={handleFucusInput}
            placeholder="Логин"
            isIcon={true}
          />
          <PasswordInput
            value={values.password.data}
            name={'password'}
            error={values.password.error}
            editIcon
            onInputError={handleError}
            onChange={handleChange}
            onBlur={handleFucusInput}
          />
        </Form>
    </section>

    { request && (
      <Loader />  
      ) 
    }
    </>
  )
}