import { FC } from "react";
import styles from './constructorElement.module.css';
import { CurrencyIcon, DeleteIcon, LockIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

interface IConstructorElement {
  type?: 'top' | 'bottom' | undefined,
  price: number,
  text: string,
  image: string,
  isLocked?: boolean | undefined,
  extraClass?: string,
  onDelete?: () => void
}

export const ConstructorElement: FC<IConstructorElement> = ({ 
  type,
  image,
  price,
  text,
  isLocked,
  extraClass,
  onDelete
}) => {
  const classname = classNames(
    styles.constructorElement,
    type ? styles[type] : '',
    extraClass
  )

  return (
    <div className={classname}>
      <div className={styles.constructorElement__row}>
        <img className={styles.constructorElement__image} src={image} alt={text} />
        <span className={styles.constructorElement__text}>{text}</span>
        <span className={styles.constructorElement__price}>
          {price}
          <CurrencyIcon type="primary"/>
        </span>
        { isLocked ? (
          <span className={styles.constructorElement__action}>
            <LockIcon type="secondary"/>
          </span>
          ) : (
          <span className={styles.constructorElement__action} onClick={onDelete}>
            <DeleteIcon type="primary"/>
          </span>
          )
        }
        </div>
      </div>
    )
}