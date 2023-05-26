import { FC, PropsWithChildren, useCallback } from 'react';
import styles from './tab.module.css';

interface ITab {
  value: string,
  active: boolean,
  onClick: (value: string) => void
}

export const Tab: FC<PropsWithChildren<ITab>> = ({ value, active, onClick, children }) => {
  const handleClick = useCallback(() => {
    if(typeof onClick == 'function') onClick(value)
  }, [onClick, value]);
 
  return (
    <div className={`${styles.tab} ${ active ? styles.tab__status_current : '' } ${styles.tab__status_noselect}`} onClick={handleClick}>
      <span className={`${styles.tab__textWrapper} text text_type_main-default`}>
        {children}
      </span>
    </div>
    )
}