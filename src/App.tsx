import React from 'react';
import Header from './components/Header';
import ProjectSection from './components/ProjectSection';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Header />
      <ProjectSection title={'Latest Projects'} sectionNumber={1} />
    </div>
  );
}

export default App;
