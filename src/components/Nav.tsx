import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import styles from '../styles/Nav.module.scss';
import WindowSizeContext from '../utils/WindowSizeContext';
import GithubLogo from './svg/GithubLogo';
import Rocket from './svg/Rocket';
import Tooltip from './Tooltip';

const iconList = [
  {
    name: 'github',
    svg: GithubLogo,
    href: 'https://github.com/lookingcoolonavespa',
    alt: 'link to my github repo'
  }
];

interface NavProps {
  changeTheme: () => void;
  currentTheme: 'light' | 'dark';
  activateSpaceship: () => void;
}

export default function Nav({
  changeTheme,
  currentTheme,
  activateSpaceship
}: NavProps) {
  const { lessThan992px } = useContext(WindowSizeContext);
  const [y, setY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState<
    'up' | 'down' | null
  >(null);
  type ToolTipInfo = {
    text: string;
    el: HTMLElement;
  };
  const [toolTipInfo, setToolTipInfo] = useState<ToolTipInfo | null>(null);

  const rocketRef = useRef<HTMLButtonElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (y > window.scrollY) setScrollDirection('up');
    else if (y < window.scrollY) setScrollDirection('down');

    setY(window.scrollY);
  }, [y]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  let rootClasses = [styles.main];

  if (scrollDirection === 'down') rootClasses.push(styles.hide);
  else if (scrollDirection === 'up') {
    rootClasses = rootClasses.filter((c) => c !== styles.hide);
    if (y) rootClasses.push(styles.scroll);
  }

  return (
    <>
      <nav className={rootClasses.join(' ')}>
        <div className={styles.left}>
          {!lessThan992px && (
            <button
              className={styles.takeoff_btn + ' boundary shootable_el'}
              ref={rocketRef}
              aria-label="activate rocket"
              onMouseEnter={() =>
                setToolTipInfo({
                  text: 'activate spaceship',
                  el: rocketRef.current as HTMLElement
                })
              }
              onMouseLeave={() => setToolTipInfo(null)}
              onClick={activateSpaceship}
            >
              <div className={styles.filter_applier}>
                <Rocket
                  width="2em"
                  height="2em"
                  className={styles.rocket_main}
                />
              </div>
            </button>
          )}
          <div
            className={styles.theme_picker + ' boundary shootable_el'}
            ref={themeRef}
            onMouseEnter={() =>
              setToolTipInfo({
                text: 'change theme',
                el: themeRef.current as HTMLElement
              })
            }
            onMouseLeave={() => setToolTipInfo(null)}
          >
            <input
              type="checkbox"
              aria-label="theme selector"
              onChange={changeTheme}
              checked={currentTheme === 'dark'}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.btn_ctn}>
            {iconList.map((icon) => {
              return (
                <div
                  key={icon.name}
                  className={`${styles.icon_wrapper} ${
                    styles[icon.name]
                  } shootable_el boundary`}
                >
                  <a
                    href={icon.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={icon.name}
                  >
                    <icon.svg width="100%" height="100%" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      {toolTipInfo !== null ? (
        <Tooltip
          text={toolTipInfo.text}
          posInfo={toolTipInfo.el.getBoundingClientRect()}
          direction="bottom"
        />
      ) : undefined}
    </>
  );
}
