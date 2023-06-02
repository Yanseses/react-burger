import React, { FC, HTMLProps, memo, useRef, useState } from "react";
import styles from './passwordInput.module.css';
import { Text } from "../../Text/Text";
import { HideIcon, ShowIcon, EditIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IHandlerError } from "../../../hooks/useForm";

interface IPasswordInput extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  name: string,
  editIcon?: boolean;
  error: boolean;
  onInputError(e: IHandlerError): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

export const PasswordInput: FC<IPasswordInput> = memo(({ 
  value,
  name,
  editIcon = false,
  error,
  onChange,
  onIconClick,
  onInputError,
  onBlur,
  onFocus,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ inputType, setInputType ] = useState<'password' | 'text'>('password');
  const [ disabled, setDisabled ] = useState(editIcon ? true : false);
  const [ focused, setFocused ] = useState(false);

  const handleFocus = () => {
    if(!disabled){
      onInputError({ name, status: false })
      setFocused(true)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  const handleIconClick = () => {
    setInputType('text')
    if(editIcon && !focused) {
      setDisabled(!disabled)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  const handleOutFocuss = (event: any) => {
    setFocused(false)
    setInputType('password')
    if(editIcon) setDisabled(true)
    if(value.length > 0 && value.length < 5) onInputError({ name, status: true })
    if(!error && onBlur) onBlur(event)
  }

  return (
    <div 
      className={styles.passwordInput}
      onFocus={handleFocus}
      onBlur={handleOutFocuss}
      onClick={handleFocus}>
      <div className={`${styles.passwordInput__wrapper} ${ disabled ? styles.passwordInput__disabled : ''} ${focused ? styles.passwordInput__status_active : ''} ${ error ? styles.passwordInput__status_error : ''} `} tabIndex={disabled ? undefined : 1}>
        <label
          className={`${ styles.passwordInput__placeholder } ${ focused ? styles.passwordInput__placeholder_focused : '' }  ${ value.length > 0 ? styles.passwordInput__placeholder_filled : '' } ${ disabled ? styles.passwordInput__placeholder_disabled : '' } text_type_main-default`}>
          Пароль
        </label>
        <input
          className={`${styles.passwordInput__textfield} ${ disabled ? `text_color_inactive text_type_main-default ${styles.passwordInput__textfield_disabled}` : 'text_type_main-default' }`}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
          ref={inputRef}
        />
        <div onClick={handleIconClick} className={styles.passwordInput__iconWrapper}>
          { editIcon 
            ? ( <EditIcon  type="primary"/> )
            : inputType === 'password' 
              ? ( <ShowIcon type="primary" /> ) 
              : ( <HideIcon type="primary" /> ) 
          }
        </div>
      </div>
      { error && (
        <Text As="p" color={'error'}>
          { 'Не корректный пароль' }
        </Text>
        ) 
      }
    </div>
    )
})