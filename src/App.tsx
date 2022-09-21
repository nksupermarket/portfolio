import React, { useState, useEffect } from 'react';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import Nav from './components/Nav';
import ProjectSection from './components/ProjectSection';
import SkillsSection from './components/SkillsSection';
import './styles/App.scss';
import { getCurrentTheme } from './utils/misc';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getCurrentTheme());

  useEffect(
    function pullTheme() {
      localStorage.setItem('theme', theme);
      document.querySelector('html')?.setAttribute('color-mode', theme);
    },
    [theme]
  );

  function changeTheme() {
    setTheme((prev) => {
      return prev === 'light' ? 'dark' : 'light';
    });
  }

  useEffect(function addSpaceshipEvent() {
    window.addEventListener('keydown', async (e) => {
      if (e.key !== ' ') return;
      e.preventDefault();
      await import('html-spaceship/src/main');
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <Nav changeTheme={changeTheme} currentTheme={theme} />
      <Header theme={theme} />
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
