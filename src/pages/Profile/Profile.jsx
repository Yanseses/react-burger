import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { Form } from '../../components/Form/Form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Aside } from '../../components/Aside/Aside';
import { changeUserData, getUserData } from '../../services/actions/auth';
import { Redirect } from 'react-router-dom';

export default function Profile(){
  const { user, userAuthorized } = useSelector(store => ({
    token: store.auth.token,
    user: store.auth.user,
    userAuthorized: store.auth.userAuthorized
  }));
  const dispatch = useDispatch();
  const nameInputRef = useRef(null);
  const [ disabledNameInput, setDisabledNameInput ] = useState(true)
  const [ profile, setProfile ] = useState(user);

  const onChange = e => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleIconClick = () => {
    setDisabledNameInput(!disabledNameInput);
    setTimeout(() => nameInputRef.current.focus(), 0)
  }

  const handleFucusInput = e => {
    setDisabledNameInput(!disabledNameInput);

    dispatch(changeUserData(profile));
  }

  if(!userAuthorized){
    return (
      <Redirect to={{
        pathname: '/login'
      }}/>
    )
  }

  return (
    <main className={styles.profile}>
      <Aside />
      <section className={styles.profile__section}>
        <Form>
          <Input
            type={'text'}
            placeholder={'Имя'}
            disabled={disabledNameInput}
            onIconClick={handleIconClick}
            onBlur={handleFucusInput}
            ref={nameInputRef}
            onChange={onChange}
            value={profile.name}
            icon={'EditIcon'}
            name={'name'}
            error={false}
            size={'default'}
          />
          <EmailInput
            onChange={onChange}
            value={profile.email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
          />
          <PasswordInput
            onChange={onChange}
            value={profile.password}
            name={'password'}
            icon="EditIcon"
          />
        </Form>
      </section>
    </main>
  )
}