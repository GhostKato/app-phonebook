import s from './HomePage.module.css'
import phonebookImg from '../../img/phonebook.jpg';

const HomePage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Welcome to the phonebook.</h1>
       <img className={s.img} src={phonebookImg} alt="Phonebook image" />
    </div>
  )
}

export default HomePage