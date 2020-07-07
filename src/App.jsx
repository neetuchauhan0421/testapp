/*
 * Copyright (c) Schrocken Inc.
 * Author: Ravi Teja
 * File Description: Main App file for Routes and Redux-Store
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import setAuthToken from './utils/setAuthToken';

// Main Routes file
import Routes from './Routes';

// Importing Store file (Redux)
import Store from './Store';

// Check for token
if (localStorage.sauth) {
  setAuthToken(localStorage.sauth);
}

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
