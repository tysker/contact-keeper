import React, { useReducer } from 'react';
//import uuid from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Joerg Oertel',
        email: 'joerg@mail.com',
        phone: '111-222-333',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Steve Taylor',
        email: 'steve@mail.com',
        phone: '666-222-333',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Michelle Duus',
        email: 'michelle@mail.com',
        phone: '555-222-333',
        type: 'professional',
      },
    ],
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contact

  // Clear Filter

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {/*props children are all the children that it wraps around. See App.jsx*/}
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
