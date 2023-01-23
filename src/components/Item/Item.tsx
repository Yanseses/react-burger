import styles from './item.module.css';
import { FC, PropsWithChildren } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type TItem = {
  text: string,
  Icon: Function,
  link: string
}

export const Item: FC<PropsWithChildren<TItem>> = ({text, Icon, link}) => {
  const location = useLocation();

  return (
    <NavLink exact to={{ pathname: `${link}`}} className={styles.item} activeClassName={styles.item__active}>
      <Icon type={location.pathname === link ? 'primary' : 'secondary'} />
      <span className={`text text_type_main-default`}>{text}</span>
    </NavLink>
  )
}