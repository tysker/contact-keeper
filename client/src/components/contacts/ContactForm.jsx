import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = props => {
  const contactContext = useContext(ContactContext);
  const { addContact, clearCurrent, updateContact, current } = contactContext;

  const initialState = {
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  };

  const [contact, setContact] = useState(initialState);
  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialState);
    }
  }, [current]);

  const onChange = e => {
    console.log(e.target.value);
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = e => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <label htmlFor="per">Personal </label>
      <input
        id="per"
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      <label htmlFor="pro">Professional </label>
      <input
        id="pro"
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
