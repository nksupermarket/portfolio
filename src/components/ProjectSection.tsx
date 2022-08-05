import React, { useState, useRef, useEffect } from 'react';
import Project from './Project';
import SectionHeader from './SectionHeader';

import useIntersectionObserver from '../utils/useIntersectionObserver';

import { SectionProps } from '../types/interfaces';
import styles from '../styles/ProjectSection.module.scss';
import crochessScreen from '../assets/images/optimized/crochess-screen.webp';
import breadScreen from '../assets/images/optimized/discord-screen.webp';
import wheresWaldoScreen from '../assets/images/optimized/wheres_waldo_screen.webp';
import battleshipScreen3 from '../assets/images/optimized/battleship_screen_3(1).webp';
import legoScreen from '../assets/images/optimized/lego_ecommerce-screen.webp';

import resizedCrochessScreen from '../assets/images/optimized/resized/crochess-screen.webp';
import resizedBreadScreen from '../assets/images/optimized/resized/discord-screen.webp';
import resizedWheresWaldoScreen from '../assets/images/optimized/resized/wheres_waldo_screen.webp';
import resizedBattleshipScreen3 from '../assets/images/optimized/resized/battleship_screen_3(1).webp';
import resizedLegoScreen from '../assets/images/optimized/resized/lego_ecommerce-screen.webp';

import useWindowWidth from '../utils/useWindowWidth';

export default function ProjectSection({
  title,
  sectionNumber
}: SectionProps) {
  const { greaterThan1920px } = useWindowWidth();

  const triggerRef = useRef<HTMLElement>(null);

  const ioData = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
    threshold: 0.07
  });

  const visible = ioData?.isIntersecting || false;

  const [startProjectAnime, setStartProjectAnime] = useState(false);

  useEffect(() => {
    if (ioData?.isIntersecting)
      setTimeout(() => setStartProjectAnime(true), 200);
  }, [ioData?.isIntersecting]);

  const projects = [
    {
      title: 'lego store',
      desc: 'Peruse through and purchase your favorite lego sets.',
      image: {
        src: greaterThan1920px ? legoScreen : resizedLegoScreen,
        alt: 'screenshot of lego ecommerce store',
        objectPosition: '50% 50%'
      },
      stack: ['Typescript', 'Next.js', 'Sass'],
      links: {
        live: 'https://bit.ly/3zX1vXO',
        repo: 'https://bit.ly/3zWzJLp'
      }
    },
    {
      title: 'croChess',
      desc: 'Play live online chess with your friends. Choose from standard time controls or create your own. All timers run on the backend.',
      image: {
        src: greaterThan1920px ? crochessScreen : resizedCrochessScreen,
        alt: 'screenshot of chess game in action',
        objectPosition: '71% 50%'
      },
      stack: ['Typescript', 'Express', 'Next.js', 'Sass'],
      links: {
        live: 'https://bit.ly/3a0ttrJ',
        repo: 'https://bit.ly/3Nc9hB3'
      }
    },
    {
      title: 'bread',
      desc: 'A community-based chat application where you can hang out with friends or find communities where people share your interests. Create a channel and start your own community or just sit back and enjoy the conversations.',
      image: {
        src: greaterThan1920px ? breadScreen : resizedBreadScreen,
        alt: 'screenshot of chat channel in bread',
        objectPosition: '0% 50%'
      },
      stack: ['Javascript', 'React', 'Css'],
      links: {
        live: 'https://bit.ly/3qPqh6M',
        repo: 'https://bit.ly/3G1ADH0'
      }
    },
    {
      title: "Where's Waldo",
      desc: "Compete with players around the world for the best time in a game of Where's Waldo. 7 different levels means 7 chances to get that #1 spot.",
      image: {
        src: greaterThan1920px
          ? wheresWaldoScreen
          : resizedWheresWaldoScreen,
        alt: "screenshot of where's waldo home page",
        objectPosition: '50% 50%'
      },
      stack: ['Javascript', 'React', 'Css'],
      links: {
        live: 'https://bit.ly/3nqFj1F',
        repo: 'https://bit.ly/33AWQgs'
      }
    },
    {
      title: 'Battleship',
      desc: "Play a game of battleship where the computer will stop at nothing to defeat you. It's your fleet admiral. Defend your position!",
      image: {
        src: greaterThan1920px
          ? battleshipScreen3
          : resizedBattleshipScreen3,
        alt: 'screenshot of battleship home page',
        objectPosition: '50% 50%'
      },
      stack: ['Javascript', 'Html', 'Css'],
      links: {
        live: 'https://lookingcoolonavespa.github.io/battleship/dist/',
        repo: 'https://github.com/lookingcoolonavespa/battleship'
      }
    }
  ];
  return (
    <section className={styles.main} ref={triggerRef}>
      <SectionHeader
        title={title}
        number={sectionNumber}
        visible={visible}
      />
      {projects.map((p, i) => (
        <Project
          key={i}
          {...p}
          reverse={i % 2 === 0}
          fireAnime={startProjectAnime}
        />
      ))}
    </section>
  );
}
