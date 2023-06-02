import React, { FC, HTMLProps, memo, useCallback, useRef, useState } from "react";
import styles from './input.module.css';
import { Text } from "../../Text/Text";
import { IHandlerError } from "../../../hooks/useForm";
import { EditIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IMainInput extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  placeholder?: string;
  error: boolean;
  isIcon?: boolean;
  name: string;
  onInputError(e: IHandlerError): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

export const Input: FC<IMainInput> = memo(({
  name,
  value,
  placeholder,
  isIcon,
  error,
  onInputError,
  onChange,
  onBlur,
  onFocus,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ focused, setFocused ] = useState(false);
  const [ disabled, setDisabled ] = useState(isIcon ? true : false);

  const handleFocus = useCallback(() => {
    if(!disabled){
      onInputError({ name, status: false })
      setFocused(true)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [disabled, name, onInputError])

  const handleIconClick = useCallback(() => {
    if(isIcon && !focused) {
      setDisabled(!disabled)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [disabled, focused, isIcon])

  const handleOutFocuss = useCallback((event: any) => {
    setFocused(false)
    if(isIcon) setDisabled(true)
    if(value.length > 0 && value.length < 2) onInputError({ name, status: true })
    if(!error && onBlur) onBlur(event)
  }, [error, isIcon, name, onBlur, onInputError, value.length]);

  return (
    <div 
      className={styles.input}
      onFocus={handleFocus}
      onBlur={handleOutFocuss}
      onClick={handleFocus}>
      <div className={`${styles.input__wrapper} ${disabled ? styles.input__disabled : ''} ${focused ? styles.input__status_active : ''} ${ error ? styles.input__status_error : '' }`} tabIndex={disabled ? undefined : 1}>
        <label
          className={`${ styles.input__placeholder } ${ focused ? styles.input__placeholder_focused : '' }  ${ value.length > 0 ? styles.input__placeholder_filled : '' } ${ disabled ? styles.input__placeholder_disabled : '' } text_type_main-default`}>
          { placeholder }
        </label>
        <input
          className={`${styles.input__textfield} ${ disabled ? `text_color_inactive text_type_main-default ${styles.input__textfield_disabled}` : 'text_type_main-default' }`}
          name={name}
          type={'text'} 
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
          ref={inputRef}
        />
        { isIcon && (
          <div onClick={handleIconClick} className={styles.input__iconWrapper}>
            <EditIcon type="primary" />
          </div>
          ) 
        }
      </div>
      { error && (
        <Text As="p" color={'error'}>
          { 'Ошибка заполнения данных' }
        </Text>
        ) 
      }
    </div>
    )
})