import s from './ContactsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectIsError, selectContacts } from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import AddContactForm from '../../components/AddContactForm/AddContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { selectFilteredContacts } from '../../redux/filters/selectors';
import ContactsLoader from '../../components/Loaders/ContactsLoader/ContactsLoader';

function ContactsPage() {

  const [isOpenAddContact, setIsAddContactOpen] = useState(false);
  
  const dispatch = useDispatch();  
  
  const isError = useSelector(selectIsError);
  const contacts = useSelector(selectContacts);
    
  
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isOpenAddContact) {
       setIsAddContactOpen(false);
    } else if (event.key === 'a' && !isOpenAddContact) {
      setIsAddContactOpen(true);
    }
  };

  useEffect(() => {
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenAddContact]);
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  const filteredContacts = useSelector(selectFilteredContacts);
  
  if (!filteredContacts || !Array.isArray(filteredContacts)) {
    return <p>No contacts available.</p>;
  }

  return (
    <div className={s.container}>
      
      <button className={s.btn} onClick={() =>  setIsAddContactOpen(prevState => !prevState)}>
        {isOpenAddContact ? 'Close add bar' : 'Add contact'}
      </button>
      
      {isOpenAddContact && <AddContactForm />}
      
      {contacts.length !== 0 && contacts.length > 5 && <SearchBox />}
      
      <ContactList contacts={filteredContacts} />
      
      <ContactsLoader />
      
      {isError && <h2>Something went wrong!</h2>}
    </div>
  );
}

export default ContactsPage;
