import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import AboutSection from './components/section/AboutSection';
import ContactSection from './components/section/ContactSection';
import ProjectSection from './components/section/ProjectSection';
import SkillsSection from './components/section/SkillsSection';
import styles from './styles/App.module.scss';
import { getCurrentTheme } from './utils/misc';
import useWindowWidth from './utils/useWindowWidth';
import WindowSizeContext from './utils/WindowSizeContext';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getCurrentTheme());
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

  const bgImage = useMemo(() => {
    if (theme === 'dark') {
      return lessThan992px
        ? require('./assets/images/optimized/resized/john-fowler-RsRTIofe0HE-unsplash.webp')
        : require('./assets/images/optimized/john-fowler-RsRTIofe0HE-unsplash.webp');
    } else {
      return lessThan992px
        ? require('./assets/images/optimized/resized/wes-hicks-ZW6RUvsaFTc-unsplash.webp')
        : require('./assets/images/optimized/wes-hicks-ZW6RUvsaFTc-unsplash.webp');
    }
  }, [theme, lessThan992px]);

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
          {bgImage ? (
            <div
              className={styles.bg}
              style={{ backgroundImage: `url(${bgImage})` }}
            ></div>
          ) : undefined}
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
      </WindowSizeContext.Provider>
    </div>
  );
}

export default App;
