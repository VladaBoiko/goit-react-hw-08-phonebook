import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Input, Forma, Label, Button, ErMessage } from './Form.styled';

const schema = yup.object().shape({
  name: yup.string().required(),
});
const formValues = {
  name: '',
  number: '',
};

export const AddForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    if (
      contacts.items.some(
        contact =>
          contact.name.toLowerCase() === values.name.toLowerCase().trim()
      )
    ) {
      Notify.failure('Such a contact exists in your contacts list...');
    }
    if (
      !contacts.items.some(
        contact =>
          contact.name.toLowerCase() === values.name.toLowerCase().trim()
      )
    ) {
      dispatch(addContacts(values));
      Notify.success('Contact created? horraaaaaaaay)');
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Forma autoComplete="off">
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErMessage name="name" component="p" />
        </Label>
        <Label htmlFor="number">
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErMessage name="number" component="p" />
        </Label>
        <Button type="submit">Add contact</Button>
      </Forma>
    </Formik>
  );
};
