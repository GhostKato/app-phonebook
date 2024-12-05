import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/filters/selectors';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  
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
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
