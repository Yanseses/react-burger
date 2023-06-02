import { FC, memo } from "react";
import styles from './ingridientsIcon.module.css';
import classNames from "classnames";
import { Text } from "../../Text/Text";
import { useMediaQuery } from "react-responsive";

interface IIngridientIcon {
  index?: number,
  image?: string,
  extraClass?: string,
  excess?: number
}

export const IngridientsIcon: FC<IIngridientIcon> = memo(({ image, index, extraClass, excess }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const classnames = classNames(
    extraClass,
    styles.ingridientsIcon,
  );

  return (
    <div 
      className={classnames} 
      style={index !== undefined ? { zIndex: 50 - index, left: (isMobile ? 30 : 50) * index  } : {}}
    >
      { excess && (
        <Text numberSize='default' extraClass={styles.ingridientsIcon__status_excess}>
          {`+${excess}`}
        </Text>
        ) 
      }
      <img src={image} alt="" className={styles.ingridientsIcon__image}/>
    </div>
  )
})