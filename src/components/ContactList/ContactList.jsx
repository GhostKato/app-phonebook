import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/filters/selectors';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  // Додаткові перевірки, щоб уникнути помилок
  if (!filteredContacts || !Array.isArray(filteredContacts)) {
    console.error('filteredContacts is not an array or is undefined:', filteredContacts);
    return <p>No contacts available.</p>;
  }

  return (
    <ul className={s.list}>      
      {filteredContacts.map(contact => (
        <li className={s.item} key={contact.id}>
          <Contact
            id={contact.id}
            name={contact.name}
            number={contact.phoneNumber
}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;