import React from 'react';
import Header from './components/Header';
import Section from './components/Section';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Header />
      <Section title={'Latest Projects'} number={1} />
    </div>
  );
}

export default App;
