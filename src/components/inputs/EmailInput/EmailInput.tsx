import React, { FC, HTMLProps, useRef, useState } from "react";
import styles from './emailInpit.module.css';
import { Text } from "../../Text/Text";

interface IEmailInput extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  isIcon?: boolean;
  errorText?: string;
  name: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

export const EmailInput: FC<IEmailInput> = ({ 
  name,
  value,
  disabled,
  placeholder,
  errorText = 'Не корректно заполненное поле',
  onChange,
  isIcon = false,
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
    if(((!value.includes('.ru') && !value.includes('.com')) || !value.includes('@')) && value.length > 0 ) setError(true)
    if(!error && onBlur) onBlur(event)
  }

  return (
    <div 
      className={styles.emailInput}
      onFocus={handleFocus}
      onBlur={handleOutFocuss}
      onClick={handleFocus}>
      <div className={`${styles.emailInput__wrapper} ${disabled ? styles.emailInput__disabled : ''} ${focused ? styles.emailInput__status_active : ''} ${ error ? styles.emailInput__status_error : '' }`} tabIndex={disabled ? undefined : 1}>
        <label
          className={`${ styles.emailInput__placeholder } ${ focused ? styles.emailInput__placeholder_focused : '' }  ${ value.length > 0 ? styles.emailInput__placeholder_filled : '' } text_type_main-default`}>
          { placeholder }
        </label>
        <input
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
          <div onClick={onIconClick}>
            {/* Icon */}
          </div>
          ) 
        }
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