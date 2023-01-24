import React, { useState, useEffect } from 'react';
import AboutSection from './components/section/AboutSection';
import ContactSection from './components/section/ContactSection';
import Header from './components/Header';
import Nav from './components/Nav';
import ProjectSection from './components/section/ProjectSection';
import SkillsSection from './components/section/SkillsSection';
import styles from './styles/App.module.scss';
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
      <main className={styles.main}>
        <div className={[styles.fade, styles.top].join(' ')}></div>
        <div className={styles.bg}></div>
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
      </main>
    </div>
  );
}

export default App;
