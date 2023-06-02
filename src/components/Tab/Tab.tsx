import { FC, PropsWithChildren, useCallback } from 'react';
import styles from './tab.module.css';
import classNames from 'classnames';

interface ITab {
  value: string,
  active: boolean,
  onClick: (value: string) => void
}

export const Tab: FC<PropsWithChildren<ITab>> = ({ value, active, onClick, children }) => {
  const handleClick = useCallback(() => {
    if(typeof onClick == 'function') onClick(value)
  }, [onClick, value]);

  const classnames = classNames(
    styles.tab,
    styles.tab__ststus_noselect,
    active && styles.tab__status_current,
  )
 
  return (
    <div className={classnames} onClick={handleClick}>
      <span className={`${styles.tab__textWrapper} text text_type_main-default`}>
        {children}
      </span>
    </div>
    )
}