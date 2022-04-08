import React, { Fragment, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ContactContext from '../../context/contact/ContactContext';

import ContactItem from './ContactItem';

const Contacts = props => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      {filtered !== null ? (
        <AnimatePresence>
          {filtered.map(contact => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ContactItem contact={contact} />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {contacts.map(contact => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ContactItem contact={contact} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </Fragment>
  );
};

export default Contacts;
