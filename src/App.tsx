import React, { useState, useEffect, Suspense } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import ProjectSection from './components/section/ProjectSection';
import styles from './styles/App.module.scss';
import { getCurrentTheme } from './utils/misc';
import useWindowWidth from './utils/useWindowWidth';
import WindowSizeContext from './utils/WindowSizeContext';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getCurrentTheme());
  const [bgImage, setBgImage] = useState<string>();
  const { greaterThan1920px, lessThan992px } = useWindowWidth();

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

  useEffect(() => {
    if (theme === 'dark') {
      setBgImage(
        lessThan992px
          ? require('./assets/images/optimized/resized/john-fowler-RsRTIofe0HE-unsplash.webp')
          : require('./assets/images/optimized/john-fowler-RsRTIofe0HE-unsplash.webp')
      );
    } else {
      setBgImage(
        lessThan992px
          ? require('./assets/images/optimized/resized/wes-hicks-ZW6RUvsaFTc-unsplash.webp')
          : require('./assets/images/optimized/wes-hicks-ZW6RUvsaFTc-unsplash.webp')
      );
    }
  }, [theme, lessThan992px]);

  const SkillsSection = React.lazy(
    () => import('./components/section/SkillsSection')
  );
  const AboutSection = React.lazy(
    () => import('./components/section/AboutSection')
  );
  const ContactSection = React.lazy(
    () => import('./components/section/ContactSection')
  );

  return (
    <div className="App">
      <WindowSizeContext.Provider
        value={{
          greaterThan1920px,
          lessThan992px
        }}
      >
        <header className="App-header"></header>
        <Nav changeTheme={changeTheme} currentTheme={theme} />
        <Header theme={theme} />
        <main className={styles.main}>
          <div className={[styles.fade, styles.top].join(' ')}></div>
          <div
            className={styles.bg}
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
          <ProjectSection
            title={{ firstRow: 'Latest', secondRow: 'Projects' }}
            sectionNumber={1}
          />
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </main>
      </WindowSizeContext.Provider>
    </div>
  );
}

export default App;
