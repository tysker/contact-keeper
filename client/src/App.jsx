import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ContactState from './context/contact/ContactState';
import axios from 'axios';

import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar title={'Contact Keeper'} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About version={'1.0.0'} />} />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
};

export default App;
