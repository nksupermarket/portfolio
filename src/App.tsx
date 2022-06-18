import React from 'react';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import Nav from './components/Nav';
import ProjectSection from './components/ProjectSection';
import SkillsSection from './components/SkillsSection';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Nav />
      <Header />
      <ProjectSection
        title={{ firstRow: 'Latest', secondRow: 'Projects' }}
        sectionNumber={1}
      />
      <SkillsSection
        title={{ firstRow: 'Skills', secondRow: 'Toolkit' }}
        sectionNumber={2}
      />
      <AboutSection
        title={{ firstRow: 'Who am I?', secondRow: 'About me' }}
        sectionNumber={3}
      />
      <ContactSection
        title={{ firstRow: 'Talk to me', secondRow: 'Contact' }}
        sectionNumber={4}
      />
    </div>
  );
}

export default App;
