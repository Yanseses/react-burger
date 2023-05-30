import styles from './item.module.css';
import { FC, PropsWithChildren } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Text } from '../Text/Text';

type TItem = {
  text: string,
  Icon: Function,
  link: string,
  onClick?: () => void
}

export const Item: FC<PropsWithChildren<TItem>> = ({ text, Icon, link, onClick }) => {
  const location = useLocation();

  return (
    <NavLink to={link} onClick={onClick} className={
      ({isActive}) => `${isActive ? `${styles.item__active}` : '' } ${styles.item}`
      } end>
      <Icon type={location.pathname === link ? 'primary' : 'secondary'} />
      <Text As='span' textSize='default' color={location.pathname === link ? 'primary' : 'inactive'}>{text}</Text>
    </NavLink>
  )
}