import styles from './main.module.css'
import propTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Main(props){
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        {props.children}
      </main>
    </DndProvider>
  )
}

Main.propTypes = {
  children: propTypes.node.isRequired
}