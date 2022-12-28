import styles from './form.module.css'

export function Form({title, children, onSubmit}){
  return (
    <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
      { title && (
        <h2 className={`${styles.form__title} text text_type_main-medium`}>{title}</h2>
        )
      }
      {children}
    </form>
  )
}