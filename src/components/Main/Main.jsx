import styles from './main.module.css'

export default function Main(props){

  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
}