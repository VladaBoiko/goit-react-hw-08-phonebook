import { AddForm } from 'components/Form/Form';
import { MainTitle } from 'components/MainTitle/MainTitle';
import { Section } from 'components/SectionWithTitle/SectionWithTitle';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';

export default function Contacts() {
  return (
    <div
      style={{
        width: '1000px',
        margin: '0 auto',
        padding: '0 50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MainTitle />
      <AddForm />
      <Filter />
      <Section title="Contacts">
        <ContactList />
      </Section>
    </div>
  );
}
