import { memo, FC, useState } from 'react';
import styles from './header.module.css';
import { ProfileIcon, BurgerIcon, ListIcon, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Item } from "../Item/Item";
import { Link } from "react-router-dom";
import { useSelector } from '../../services/hooks';
import { Logo, LogoMobile } from '../../utils/icons';
import { useMediaQuery } from 'react-responsive';
import { Modal } from '../modal/Modal';

const Header: FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const userName = useSelector(store => store.auth.user.data.name);
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
        { isMobile ? ( 
          <button className={styles.header__menuBtn} onClick={handleMenuClick}>
            <MenuIcon type='primary' />
          </button>
        ) : (
          <Item 
            text={userAuthorized ? userName : 'Личный кабинет'} 
            Icon={ProfileIcon} 
            link={userAuthorized ? '/profile' : '/login'} 
          />
          ) 
        }
      </div>

      { isMenuOpen && (
        <Modal title='Меню' onClose={handleMenuClick}>
          <div className={styles.header__mobileWrapper}>
            <Item 
              text={'Личный кабинет'} 
              onClick={handleMenuClick} 
              Icon={ProfileIcon} 
              link={userAuthorized ? '/profile' : '/login'} />
            <Item 
              text={'Конструктор'} 
              onClick={handleMenuClick} 
              Icon={BurgerIcon} 
              link={'/'} />
            <Item 
              text={'Лента заказов'} 
              onClick={handleMenuClick} 
              Icon={ListIcon} 
              link={'/feed'} />
          </div>
        </Modal>  
        ) 
      }
    </header>
  )
}

export default memo(Header)