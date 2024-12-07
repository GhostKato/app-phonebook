import s from './ContactsPage.module.css'
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { selectIsError, selectIsLoading, selectContacts } from '../../redux/contacts/selectors.js';
import { fetchContacts } from '../../redux/contacts/operations.js';
import AddContactForm from '../../components/AddContactForm/AddContactForm.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import ContactList from '../../components/ContactList/ContactList.jsx';
import useToggle from '../../hooks/visibilityToggle.js';
import { selectFilteredContacts } from '../../redux/filters/selectors';

function ContactsPage() {

  
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [isOpenAdd, toggleAdd] = useToggle(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isOpenAdd) {
      toggleAdd();
    } else if (event.key === 'a' && !isOpenAdd) {
      toggleAdd(); 
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenAdd]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = useSelector(selectFilteredContacts);
  
  if (!filteredContacts || !Array.isArray(filteredContacts)) {    
    return <p>No contacts available.</p>;
  }

  return (
    <div className={s.container}>
      <button className={s.btn} onClick={toggleAdd}>
        {isOpenAdd ? 'Close add bar' : 'Add contact'}
      </button>
      {isOpenAdd && <AddContactForm />}
      {contacts.length !== 0 && <SearchBox />}
      <ContactList contacts={filteredContacts} />
      {isLoading && <h1>Loading...</h1>}
      {isError && <h2>Something went wrong!</h2>}
    </div>
  );
}

export default ContactsPage;


