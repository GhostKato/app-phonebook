import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';

import { selectFilteredContacts } from '../../redux/filters/selectors';

const ContactList = () => {
   const filteredContacts = useSelector(selectFilteredContacts); 
  
  return (
    <ul className={s.list}>
      {filteredContacts.map(contact => (
        <li className={s.item} key={contact.id}>
          <Contact
            id={contact.id}
            name={contact.name}
            number={contact.number}            
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
