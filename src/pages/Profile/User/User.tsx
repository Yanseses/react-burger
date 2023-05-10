import { useEffect, useRef, useState, FocusEvent } from "react";
import { useDispatch, useSelector } from "../../../services/hooks";
import { useForm } from "../../../hooks/useForm";
import styles from './user.module.css';
import { Form } from "../../../components/Form/Form";
import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { changeUserData } from "../../../services/thunks/auth";
import { useNavigate } from "react-router-dom";

export default function User(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const user = useSelector(store => store.auth.user.data);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [ disabledNameInput, setDisabledNameInput ] = useState<boolean>(true);
  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setValues(user)
  }, [setValues, user]);

  useEffect(() => {
    if(!userAuthorized) navigate('/login')
  }, [navigate, userAuthorized])

  const handleIconClick = (): void => {
    setDisabledNameInput(!disabledNameInput);
    setTimeout(() => nameInputRef.current?.focus(), 0)
  }

  const handleFucusInput = (e: FocusEvent<HTMLInputElement>): void => {
    if(e.target.name === 'name'){
      setDisabledNameInput(!disabledNameInput);
    }

    dispatch(changeUserData(values));
  }
  
  return (
    <section className={styles.user}>              
      <Form>
        <Input
          type={'text'}
          placeholder={'Имя'}
          disabled={disabledNameInput}
          onIconClick={handleIconClick}
          onBlur={handleFucusInput}
          ref={nameInputRef}
          onChange={handleChange}
          value={values.name}
          icon={'EditIcon'}
          name={'name'}
          error={false}
        />
        <EmailInput
          onChange={handleChange}
          onBlur={handleFucusInput}
          value={values.email}
          name={'email'}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={handleChange}
          onBlur={handleFucusInput}
          value={values.password}
          name={'password'}
          icon="EditIcon"
        />
      </Form>
  </section>
  )
}