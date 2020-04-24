import React from 'react';
import './app.css';

import { Header } from '../header/header.component';
import { Tracker } from '../tracker/tracker';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="tracker">
        <Tracker />
      </div>
    </div>
  );
}

export default App;
