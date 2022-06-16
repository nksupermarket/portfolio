import React from 'react';
import Header from './components/Header';
import ProjectSection from './components/ProjectSection';
import SkillsSection from './components/SkillsSection';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Header />
      <ProjectSection title={'Latest Projects'} sectionNumber={1} />
      <SkillsSection title="Skills Toolkit" sectionNumber={2} />
    </div>
  );
}

export default App;
