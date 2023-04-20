import styles from './profile.module.css';
import { Aside } from '../../components/Aside/Aside';
import { Route, Routes } from 'react-router-dom';
import History from './History/History';
import User from './User/User';

export default function Profile(){
  return (
    <main className={styles.profile}>
      <Aside />
      <Routes>
        <Route path='/' element={ <User /> }/>
        <Route path='/orders' element={ <History /> } />
      </Routes>
    </main>
  )
}