import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { ContactItem } from '../ContactItem/ContactItem';
import { List } from './ContactsList.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

const filtered = (contacts, filter) => {
  let filterContacts = null;
  if (filter === '') {
    filterContacts = contacts;
    return filterContacts;
  }
  const normalizedFilter = filter.toLowerCase();
  filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  if (filterContacts.length < 1) {
    Notify.warning('No matches =(');
  }
  return filterContacts;
};

export const ContactList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const filter = useSelector(getFilter);
  const visibleContacts = filtered(items, filter.filter);
  return (
    <List>
      {visibleContacts.map(state => {
        return (
          <ContactItem
            name={state.name}
            key={state.id}
            number={state.number}
            id={state.id}
          />
        );
      })}{' '}
    </List>
  );
};
