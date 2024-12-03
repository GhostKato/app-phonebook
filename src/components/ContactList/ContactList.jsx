import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/filters/selectors';

const ContactList = ({ onDeleteContactSuccess }) => {
  const filteredContacts = useSelector(selectFilteredContacts);

  // Додаткові перевірки, щоб уникнути помилок
  if (!filteredContacts || !Array.isArray(filteredContacts)) {
    console.error('filteredContacts is not an array or is undefined:', filteredContacts);
    return <p>No contacts available.</p>;
  }

  return (
    <ul className={s.list}>      
      {filteredContacts.map(contact => (
        <li className={s.item} key={contact._id}>
          <Contact
            id={contact._id}
            name={contact.name}
            number={contact.phoneNumber}
            onDeleteContactSuccess={onDeleteContactSuccess}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
