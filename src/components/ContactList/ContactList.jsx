import Contact from '../Contact/Contact';
import s from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  return contacts && contacts.length > 0 ? (
    <ul className={s.list}>
      {contacts.map(contact => (
        <li className={s.item} key={contact._id}>
          <Contact
            id={contact._id}
            name={contact.name}
            number={contact.phoneNumber}
            email={contact.email}
            type={contact.contactType}
            photo={contact.photo}
            isFavourite={contact.isFavourite}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p className={s.message}>No contacts</p>
  );
};

export default ContactList;
