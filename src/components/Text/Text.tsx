import { FC, PropsWithChildren } from "react";
import styles from './text.module.css';

export type TNumberSize = 'default' | 'medium' | 'large';
export type TTextSize = 'medium' | 'default' | 'large' | 'small';
export type TTextColor = 'primary' | 'error' | 'accent' | 'inactive' | 'success';

interface IText {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div',
  textSize?: TTextSize,
  numberSize?: TNumberSize,
  color?: TTextColor
}

export const Text: FC<PropsWithChildren<IText>> = ({ 
  As = 'div', 
  textSize,
  numberSize, 
  children,
  color = 'primary'
}) => {

  return (
    <As className={ 
      textSize 
        ? `text text_type_main-${textSize} ${styles[color]}`
        : `text text_type_digits-${numberSize} ${styles[color]}`
    }>
      { children }
    </As>
  )
}