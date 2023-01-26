import React, { useContext, useEffect, useRef, useState } from 'react';
import Project from '../Project';
import SectionHeader from '../SectionHeader';

import useIntersectionObserver from '../../utils/useIntersectionObserver';

import styles from '../../styles/ProjectSection.module.scss';
import { ProjectDetails, SectionProps } from '../../types/interfaces';

import todoListScreen from '../../assets/images/optimized/todo-list.png';
import WindowSizeContext from '../../utils/WindowSizeContext';

export default function ProjectSection({
  title,
  sectionNumber
}: SectionProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const { greaterThan1920px } = useContext(WindowSizeContext);
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

  const projects = useRef<ProjectDetails[]>([]);
  useEffect(() => {
    (async () => {
      const crochessScreen = greaterThan1920px
        ? await require('../../assets/images/optimized/crochess-screen.webp')
        : await require('../../assets/images/optimized/resized/crochess-screen.webp');
      const legoScreen = greaterThan1920px
        ? await require('../../assets/images/optimized/lego_ecommerce-screen.webp')
        : await require('../../assets/images/optimized/resized/lego_ecommerce-screen.webp');
      const breadScreen = greaterThan1920px
        ? await require('../../assets/images/optimized/discord-screen.webp')
        : await require('../../assets/images/optimized/resized/discord-screen.webp');
      const wheresWaldoScreen = greaterThan1920px
        ? await require('../../assets/images/optimized/wheres_waldo_screen.webp')
        : await require('../../assets/images/optimized/resized/wheres_waldo_screen.webp');
      projects.current = [
        {
          title: 'croChess',
          desc: 'Play live online chess with your friends. Choose from standard time controls or create your own. Features a chess engine that uses alpha-beta pruning, transposition tables, quiescent search, and piece-square tables to find the best move.',
          image: {
            src: crochessScreen,
            alt: 'screenshot of chess game in action',
            objectPosition: '71% 50%'
          },
          stack: [
            'Typescript',
            'React',
            'Sass',
            'Java',
            'Spring',
            'Supabase',
            'Docker',
            'Websockets'
          ],
          links: {
            live: 'https://bit.ly/3a0ttrJ',
            repo: 'https://bit.ly/3Nc9hB3'
          }
        },
        {
          title: 'lego store',
          desc: 'Peruse through and purchase your favorite lego sets. Product details were pulled from the official lego website using Puppeteer.',
          image: {
            src: legoScreen,
            alt: 'screenshot of lego ecommerce store',
            objectPosition: '50% 50%'
          },
          stack: [
            'Typescript',
            'Next.js',
            'Sass',
            'Puppeteer',
            'Cypress',
            'RTL'
          ],
          links: {
            live: 'https://bit.ly/3zX1vXO',
            repo: 'https://bit.ly/3zWzJLp'
          }
        },
        {
          title: 'bread',
          desc: 'A community-based chat application where you can hang out with friends or find communities where people share your interests. Create a channel and start your own community or just sit back and enjoy the conversations.',
          image: {
            src: breadScreen,
            alt: 'screenshot of chat channel in bread',
            objectPosition: '0% 50%'
          },
          stack: ['Javascript', 'React', 'Css', 'Firebase'],
          links: {
            live: 'https://bit.ly/3qPqh6M',
            repo: 'https://bit.ly/3G1ADH0'
          }
        },
        {
          title: 'Todo List',
          desc: 'Planning to take over the  world? Stay on top of your dastardly deeds by keeping track of what you need to do next.',
          image: {
            src: todoListScreen,
            alt: 'screenshot of todo list main page',
            objectPosition: '65% 50%'
          },
          stack: ['Typescript', 'Tailwind', 'Supabase', 'Next.js'],
          links: {
            live: 'https://lookingcoolonavespa.github.io/battleship/dist/',
            repo: 'https://github.com/lookingcoolonavespa/battleship'
          }
        },
        {
          title: "Where's Waldo",
          desc: "Compete with players around the world for the best time in a game of Where's Waldo. 7 different levels means 7 chances to get that #1 spot.",
          image: {
            src: wheresWaldoScreen,
            alt: "screenshot of where's waldo home page",
            objectPosition: '50% 50%'
          },
          stack: ['Javascript', 'React', 'Css'],
          links: {
            live: 'https://bit.ly/3nqFj1F',
            repo: 'https://bit.ly/33AWQgs'
          }
        }
      ];
    })();
  }, [greaterThan1920px]);

  return (
    <section
      className={styles.main + ' ' + 'main_section'}
      ref={triggerRef}
    >
      <SectionHeader
        title={title}
        number={sectionNumber}
        visible={visible}
      />
      {projects
        ? projects.current.map((p, i) => (
            <Project
              key={i}
              {...p}
              reverse={i % 2 === 0}
              fireAnime={startProjectAnime}
            />
          ))
        : undefined}
    </section>
  );
}
