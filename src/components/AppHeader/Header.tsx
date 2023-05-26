import { memo, FC } from 'react';
import styles from './header.module.css';
import { ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Item } from "../Item/Item";
import { Link } from "react-router-dom";
import { useSelector } from '../../services/hooks';
import { Logo, LogoMobile } from '../../utils/icons';
import { useMediaQuery } from 'react-responsive';

const Header: FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const userName = useSelector(store => store.auth.user.data.name);

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={styles.header__section}>
        <div className={styles.header__container}>
          <nav className={styles.header__navList}>
            <Item text={'Конструктор'} Icon={BurgerIcon} link={'/'} />
            <Item text={'Лента заказов'} Icon={ListIcon} link={'/feed'} />
          </nav>
          <Link to={'/'}>
            { isMobile ? ( <LogoMobile /> ) : ( <Logo /> ) }
          </Link>
        </div>
        <Item 
          text={userAuthorized ? userName : 'Личный кабинет'} 
          Icon={ProfileIcon} 
          link={userAuthorized ? '/profile' : '/login'} 
        />
      </div>
    </header>
  )
}

export default memo(Header)