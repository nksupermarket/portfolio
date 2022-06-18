import React from 'react';
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

export default function Nav() {
  return (
    <nav className={styles.main}>
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
    </nav>
  );
}
