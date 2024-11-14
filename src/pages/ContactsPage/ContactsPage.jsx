import s from './ContactsPage.module.css'
import { useDispatch, useSelector } from 'react-redux';


import { useEffect } from 'react';
import { selectIsError, selectIsLoading, selectContacts } from '../../redux/contacts/selectors.js';
import { fetchContacts } from '../../redux/contacts/operations.js';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import ContactList from '../../components/ContactList/ContactList.jsx';


function ContactsPage() {

   const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();  
  const contacts = useSelector(selectContacts);

   useEffect(() => {
    dispatch(fetchContacts());
   }, [dispatch]);
  
  return (
    <div className={s.container}>      
      <ContactForm />
       {contacts.length !== 0 && (
      <SearchBox />
         )}
      <ContactList />
       {isLoading && <h1>Loading...</h1>}
      {isError && <h2>Something went wrong!</h2>}
    </div>
  );
}

export default ContactsPage;
