import styles from './main.module.css'
import propTypes from 'prop-types';

export default function Main(props){
  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
}

Main.propTypes = {
  children: propTypes.node.isRequired
}