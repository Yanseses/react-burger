import React, { FC, HTMLProps, useRef, useState } from "react";
import styles from './passwordInput.module.css';

interface IPasswordInput extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  disabled?: boolean;
  name: string,
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
    if(value.length < 5) setError(true)
    if(!error && onBlur) onBlur(event)
  }

  return (
    <div 
      className={styles.input}
      onFocus={handleFocus}
      onBlur={handleOutFocuss}
      onClick={handleFocus}>
      <div className={`${styles.input__wrapper} ${disabled ? styles.input__disabled : ''} ${focused ? styles.input_active : ''}`} tabIndex={disabled ? undefined : 1}>
        <label
          onClick={iconClick}
          className={`${ styles.input__placeholder } ${ focused ? styles.input__placeholder_focused : '' }  ${ value.length > 0 ? styles.input__placeholder_filled : '' } text_type_main-default`}>
          Пароль
        </label>
        <input
          className={`${styles.input__textfield} ${ disabled ? `text_color_inactive text_type_main-default ${styles.input__textfield_disabled}` : 'text_type_main-default' }`}
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
    </div>
    )
}