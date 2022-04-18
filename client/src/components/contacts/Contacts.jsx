import React, { Fragment, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ContactContext from '../../context/contact/ContactContext';

import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = props => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        filtered !== null ? (
          <AnimatePresence>
            {filtered.map(contact => (
              <motion.div
                key={contact._id}
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
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ContactItem contact={contact} />
              </motion.div>
            ))}
          </AnimatePresence>
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
