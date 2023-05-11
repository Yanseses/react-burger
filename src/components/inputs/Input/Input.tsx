import React, { FC, HTMLProps, useRef, useState } from "react";
import styles from './input.module.css';
import { Text } from "../../Text/Text";

interface IMainInput extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  disabled?: boolean;
  icon?: 'EditIcon' | 'ShowIcon';
  errorText?: string;
  name: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

export const Input: FC<IMainInput> = ({ 
  type = 'text',
  name,
  value,
  disabled,
  placeholder,
  errorText = 'Ошибка заполнения данных',
  onChange,
  icon,
  onIconClick,
  onBlur,
  onFocus,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ focused, setFocused ] = useState(false);
  const [ error, setError ] = useState(false);

  const handleFocus = () => {
    if(error) setError(false)
    if(!disabled){
      setFocused(true)
      inputRef.current?.focus();
    }
  }

  const handleOutFocuss = (event: any) => {
    setFocused(false)
    if(value.length > 0 && value.length < 5) setError(true)
    if(!error && onBlur) onBlur(event)
  }

  return (
    <div 
      className={styles.input}
      onFocus={handleFocus}
      onBlur={handleOutFocuss}
      onClick={handleFocus}>
      <div className={`${styles.input__wrapper} ${disabled ? styles.input__disabled : ''} ${focused ? styles.input__status_active : ''} ${ error ? styles.input__status_error : '' }`} tabIndex={disabled ? undefined : 1}>
        <label
          className={`${ styles.input__placeholder } ${ focused ? styles.input__placeholder_focused : '' }  ${ value.length > 0 ? styles.input__placeholder_filled : '' } text_type_main-default`}>
          { placeholder }
        </label>
        <input
          className={`${styles.input__textfield} ${ disabled ? `text_color_inactive text_type_main-default ${styles.input__textfield_disabled}` : 'text_type_main-default' }`}
          name={name}
          type={type} 
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