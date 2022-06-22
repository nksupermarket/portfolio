import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from '../styles/Nav.module.scss';

import githubSvg from '../assets/icons/iconmonstr-github-1.svg';

const iconList = [
  {
    name: 'github',
    src: githubSvg,
    href: 'https://github.com/lookingcoolonavespa',
    alt: 'link to my github repo'
  }
];

interface NavProps {
  changeTheme: () => void;
  currentTheme: 'light' | 'dark';
}

export default function Nav({ changeTheme, currentTheme }: NavProps) {
  const [y, setY] = useState(window.scrollY);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<
    'up' | 'down' | null
  >(null);

  const handleScroll = useCallback(() => {
    if (y > window.scrollY) setScrollDirection('up');
    else if (y < window.scrollY) setScrollDirection('down');

    setScrollOffset(
      document.documentElement.scrollTop || document.body.scrollTop
    );
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
    if (scrollOffset) rootClasses.push(styles.scroll);
  }
  return (
    <nav className={rootClasses.join(' ')}>
      <div className={styles.theme_picker}>
        <input
          type="checkbox"
          onClick={changeTheme}
          checked={currentTheme === 'dark'}
        />
      </div>
      <div className={styles.btn_ctn}>
        {iconList.map((i) => {
          return (
            <div
              key={i.name}
              className={`${styles.icon_wrapper} ${styles[i.name]}`}
            >
              <a href={i.href} target="_blank" rel="noreferrer">
                <img src={i.src} alt={i.alt} />
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
