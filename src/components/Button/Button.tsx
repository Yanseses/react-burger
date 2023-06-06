import classNames from "classnames"
import styles from './button.module.css';
import { FC, SyntheticEvent } from "react";

interface IButton extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'>> {
  htmlType: 'button' | 'submit' | 'reset';
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  extraClass?: string;
}

export const Button: FC<IButton> = ({ 
  type = 'primary',
  size = 'medium',
  onClick,
  extraClass,
  htmlType,
  children,
  ...btn
  }) => {
  const buttonClass = classNames(
    styles.button,
    type === 'primary' ? styles.button_type_primary : styles.button_type_secondary,
    styles['button_size_'.concat(size)],
    extraClass,
  )

  return (
    <button type={htmlType} className={buttonClass} {...btn} onClick={onClick}>
      {children}
    </button>
  )
}