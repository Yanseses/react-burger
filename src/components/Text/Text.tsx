import { FC, PropsWithChildren } from "react";
import styles from './text.module.css';
import classNames from 'classnames'

export type TNumberSize = 'default' | 'medium' | 'large';
export type TTextSize = 'medium' | 'default' | 'large' | 'small';
export type TTextColor = 'primary' | 'error' | 'accent' | 'inactive' | 'success';

interface IText {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div',
  textSize?: TTextSize,
  numberSize?: TNumberSize,
  color?: TTextColor,
  extraClass?: string
}

export const Text: FC<PropsWithChildren<IText>> = ({ 
  As = 'div', 
  textSize,
  numberSize, 
  children,
  color = 'primary',
  extraClass
}) => {

  const classes = classNames(
    extraClass,
    'text',
    styles[color],
    textSize ? `text_type_main-${textSize}` : `text_type_digits-${numberSize}`,
  );

  return (
    <As className={classes}>
      { children }
    </As>
  )
}