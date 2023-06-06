import { FC } from "react";
import styles from './constructorElement.module.css';
import { CurrencyIcon, DeleteIcon, LockIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import { Text } from "../../Text/Text";

interface IConstructorElement {
  type?: 'top' | 'bottom',
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
    type && styles['constructorElement__type_'.concat(type)],
    extraClass
  )

  return (
    <div className={classname}>
      <div className={styles.constructorElement__row}>
        <img className={styles.constructorElement__image} src={image} alt={text} />
        <Text As="span" extraClass={styles.constructorElement__text}>{text}</Text>
        <div className={styles.constructorElement__price}>
          <Text As="span">{price}</Text>
          <CurrencyIcon type="primary"/>
        </div>
        { isLocked ? (
          <div className={styles.constructorElement__action}>
            <LockIcon type="secondary"/>
          </div>
          ) : (
          <div className={styles.constructorElement__action} onClick={onDelete}>
            <DeleteIcon type="primary"/>
          </div>
          )
        }
        </div>
      </div>
    )
}