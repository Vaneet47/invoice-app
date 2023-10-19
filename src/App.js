import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import './app.css';

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <Content />
    </div>
  );
}

export default App;
