import React, { FC, HTMLProps, useRef, useState } from "react";
import styles from './passwordInput.module.css';
import { Text } from "../../Text/Text";

interface IPasswordInput extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  disabled?: boolean;
  name: string,
  errorText?: string,
  icon?: 'EditIcon' | 'ShowIcon';
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

export const PasswordInput: FC<IPasswordInput> = ({ 
  value,
  disabled,
  name,
  onChange,
  errorText = 'Не корректный пароль',
  icon = 'ShowIcon',
  onIconClick,
  onBlur,
  onFocus,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ type, setType ] = useState<'password' | 'text'>('password');
  const [ focused, setFocused ] = useState(false);
  const [ error, setError ] = useState(false);

  const handleFocus = () => {
    setError(false)
    if(!disabled){
      setFocused(true)
      inputRef.current?.focus();
    }
  }

  const iconClick = () => {
    setType('text')
  }

  const handleOutFocuss = (event: any) => {
    setFocused(false)
    setType('password')
    if(value.length > 0 && value.length < 6) setError(true)
    if(!error && onBlur) onBlur(event)
  }

  return (
    <div 
      className={styles.passwordInput}
      onFocus={handleFocus}
      onBlur={handleOutFocuss}
      onClick={handleFocus}>
      <div className={`${styles.passwordInput__wrapper} ${disabled ? styles.passwordInput__disabled : ''} ${focused ? styles.passwordInput__status_active : ''} ${error ? styles.passwordInput__status_error : ''} `} tabIndex={disabled ? undefined : 1}>
        <label
          onClick={iconClick}
          className={`${ styles.passwordInput__placeholder } ${ focused ? styles.passwordInput__placeholder_focused : '' }  ${ value.length > 0 ? styles.passwordInput__placeholder_filled : '' } text_type_main-default`}>
          Пароль
        </label>
        <input
          className={`${styles.passwordInput__textfield} ${ disabled ? `text_color_inactive text_type_main-default ${styles.passwordInput__textfield_disabled}` : 'text_type_main-default' }`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
          ref={inputRef}
        />
        <div onClick={onIconClick}>
          {/* Icon */}
        </div>
      </div>
      { error && (
        <Text As="p" color={'error'}>
          { errorText }
        </Text>
        ) 
      }
    </div>
    )
}