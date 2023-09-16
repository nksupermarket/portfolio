import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import Hero from './components/Hero/Hero';
import Nav from './components/Nav';
import AboutSection from './components/section/AboutSection';
import ContactSection from './components/section/ContactSection';
import ProjectSection from './components/section/ProjectSection';
import SkillsSection from './components/section/SkillsSection';
import styles from './styles/App.module.scss';
import { Theme } from './types/types';
import { getCurrentTheme } from './utils/misc';
import useIntersectionObserver from './utils/useIntersectionObserver';
import { useSpaceship } from './utils/useSpaceship';
import useWindowWidth from './utils/useWindowWidth';
import WindowSizeContext from './utils/WindowSizeContext';

function App() {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme());
  const { greaterThan1920px, lessThan992px } = useWindowWidth();
  const [shouldFireAnime, setShouldFireAnime] = useState(false);
  const { runSpaceship, spaceshipActive } = useSpaceship();
  const triggerRef = useRef<HTMLDivElement>(null);
  const ioData = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
    threshold: 0.07
  });

  const contentVisible = ioData?.isIntersecting || false;
  useEffect(() => {
    if (contentVisible) fireAnime();
  }, [contentVisible]);

  useEffect(
    function pullTheme() {
      localStorage.setItem('theme', theme);
      const root = document.querySelector('html');
      if (root?.getAttribute('color-mode') !== theme)
        root?.setAttribute('color-mode', theme);
    },
    [theme]
  );

  useEffect(() => {
    (async () => {
      if (window.location.pathname === '/spaceship')
        await runSpaceship(lessThan992px, theme);
    })();
  }, []);

  useEffect(
    function () {
      function activateSpaceship(e: KeyboardEvent) {
        if (e.key !== ' ') return;
        e.preventDefault();
        runSpaceship(lessThan992px, theme);
      }
      window.addEventListener('keydown', activateSpaceship);
      return () =>
        window.removeEventListener('keydown', activateSpaceship);
    },
    [lessThan992px, theme]
  );

  function changeTheme() {
    setTheme((prev) => {
      return prev === 'light' ? 'dark' : 'light';
    });
  }

  function fireAnime() {
    if (!shouldFireAnime) setShouldFireAnime(true);
  }

  const bgImage = useMemo(() => {
    if (theme === 'dark') {
      if (greaterThan1920px)
        return require('./assets/images/optimized/john-fowler-RsRTIofe0HE-unsplash.webp');
      else if (lessThan992px)
        return require('./assets/images/optimized/resized/john-fowler-RsRTIofe0HE-unsplash.webp');
      else
        return require('./assets/images/optimized/resized/1920x1080/john-fowler-RsRTIofe0HE-unsplash.webp');
    } else {
      if (greaterThan1920px)
        return require('./assets/images/optimized/wes-hicks-ZW6RUvsaFTc-unsplash.webp');
      else if (lessThan992px)
        return require('./assets/images/optimized/resized/wes-hicks-ZW6RUvsaFTc-unsplash.webp');
      else
        return require('./assets/images/optimized/resized/1920x1080/wes-hicks-ZW6RUvsaFTc-unsplash.webp');
    }
  }, [theme, lessThan992px]);

  const SpaceshipControls = useMemo(
    () => React.lazy(() => import('./components/SpaceshipControls')),
    []
  );

  return (
    <div className="App">
      {spaceshipActive && (
        <Suspense>
          <SpaceshipControls />
        </Suspense>
      )}
      <WindowSizeContext.Provider
        value={{
          greaterThan1920px,
          lessThan992px
        }}
      >
        <Nav
          changeTheme={changeTheme}
          currentTheme={theme}
          activateSpaceship={() => runSpaceship(lessThan992px, theme)}
        />
        <Hero theme={theme} />
        <main className={styles.main}>
          <div className={[styles.fade, styles.top].join(' ')}></div>
          {bgImage ? (
            <div
              className={styles.bg}
              style={{ backgroundImage: `url(${bgImage})` }}
            ></div>
          ) : undefined}
          <div ref={triggerRef}>
            <ProjectSection
              title={{ firstRow: 'Latest', secondRow: 'Projects' }}
              sectionNumber={1}
              shouldFireAnime={shouldFireAnime}
            />
            <SkillsSection
              title={{ firstRow: 'Skills', secondRow: 'Toolkit' }}
              sectionNumber={2}
              shouldFireAnime={shouldFireAnime}
            />
            <AboutSection
              title={{ firstRow: 'Who am I?', secondRow: 'About me' }}
              sectionNumber={3}
              shouldFireAnime={shouldFireAnime}
            />
            <ContactSection
              title={{ firstRow: 'Talk to me', secondRow: 'Contact' }}
              sectionNumber={4}
              shouldFireAnime={shouldFireAnime}
            />
          </div>
        </main>
      </WindowSizeContext.Provider>
    </div>
  );
}

export default App;
