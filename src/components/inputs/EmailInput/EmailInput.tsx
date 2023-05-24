import React, { FC, HTMLProps, useRef, useState } from "react";
import styles from './emailInpit.module.css';
import { Text } from "../../Text/Text";
import { IHandlerError } from "../../../hooks/useForm";
import { EditIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IEmailInput extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  placeholder?: string;
  isIcon?: boolean;
  name: string;
  error: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onInputError(e: IHandlerError): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

export const EmailInput: FC<IEmailInput> = ({ 
  name,
  value,
  placeholder,
  isIcon = false,
  error,
  onChange,
  onBlur,
  onFocus,
  onInputError,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ disabled, setDisabled ] = useState(isIcon ? true : false);
  const [ focused, setFocused ] = useState(false);

  const validateEmail = (email: string) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.length > 0 ? reg.test(email) : true;
  }

  const handleIconClick = () => {
    if(isIcon && !focused) {
      setDisabled(!disabled)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  const handleFocus = () => {
    if(!focused){
      onInputError({ name, status: false })
      if(!disabled){
        setFocused(true)
        inputRef.current?.focus();
      }
    }
  }

  const handleOutFocuss = (event: any) => {
    setFocused(false)
    if(isIcon) setDisabled(true)
    if(!validateEmail(value)) onInputError({ name, status: true })
    if(!error && onBlur) onBlur(event)
  }

  return (
    <div 
      className={styles.emailInput}
      onFocus={handleFocus}
      onBlur={handleOutFocuss}
      onClick={handleFocus}
      >
      <div className={`${styles.emailInput__wrapper} ${ disabled ? styles.emailInput__disabled : ''} ${focused ? styles.emailInput__status_active : ''} ${ error ? styles.emailInput__status_error : '' }`}>
        <label
          className={`${ styles.emailInput__placeholder } ${ focused ? styles.emailInput__placeholder_focused : '' }  ${ value.length > 0 ? styles.emailInput__placeholder_filled : '' } ${ disabled ? styles.emailInput__placeholder_disabled : '' } text_type_main-default`}>
            { placeholder }
        </label>
        <input
          tabIndex={ disabled ? undefined : 1 }
          className={`${styles.emailInput__textfield} ${ disabled ? `text_color_inactive text_type_main-default ${styles.emailInput__textfield_disabled}` : 'text_type_main-default' }`}
          name={name}
          type={'email'} 
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
          ref={inputRef}
        />
        { isIcon && (
          <div onClick={handleIconClick} className={styles.emailInput__iconWrapper}>
            <EditIcon type="primary" />
          </div>
          ) 
        }
      </div>
      { error && (
        <Text As="p" color={'error'}>
          { 'Не корректно заполненное поле' }
        </Text>
        ) 
      }
    </div>
    )
}