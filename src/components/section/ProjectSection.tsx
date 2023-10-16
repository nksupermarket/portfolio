import { useContext, useEffect, useState } from 'react';
import Project from '../Project';
import SectionHeader from '../SectionHeader';

import { SectionProps } from '../../types/interfaces';

import WindowSizeContext from '../../utils/WindowSizeContext';
const projects = {
  // project src is defined in useEffect in component
  Ether: {
    desc: 'An aesthetic functional startpage for your browser. Navigate to your favorite sites with keybinds. (Not mobile friendly as it is designed for use on a desktop environment)',
    image: {
      src: '',
      alt: 'screenshot of Ether',
      objectPosition: '45% 65%'
    },
    stack: ['Typescript', 'HTML'],
    links: {
      live: 'https://nksupermarket.github.io/Ether/',
      repo: 'https://github.com/nksupermarket/Ether'
    }
  },
  'html-spaceship': {
    desc: "The game `Asteroid` but instead of blowing up asteroids - you're blowing up your website.",
    image: {
      src: '',
      alt: 'screenshot of html-spaceship in action',
      objectPosition: '71% 50%'
    },
    stack: ['Typescript', 'HTML'],
    links: {
      live: '/#spaceship',
      repo: 'https://github.com/nksupermarket/html-spaceship'
    }
  },
  croChess: {
    desc: 'Play live online chess with your friends. Choose from standard time controls or create your own. If your friends are busy, try your hand at beating the computer.',
    image: {
      src: '',
      alt: 'screenshot of chess game in action',
      objectPosition: '71% 50%'
    },
    stack: ['Rust', 'Typescript', 'Solid', 'Sass', 'Java', 'Postgres'],
    links: {
      live: 'http://bit.ly/3l475me',
      repo: 'http://bit.ly/3Nc9hB3'
    }
  },
  'lego store': {
    desc: 'Peruse through and purchase your favorite lego sets. Product details were pulled from the official lego website using Puppeteer.',
    image: {
      src: '',
      alt: 'screenshot of lego ecommerce store',
      objectPosition: '50% 50%'
    },
    stack: ['Typescript', 'Next.js', 'Sass'],
    links: {
      live: 'https://bit.ly/3zX1vXO',
      repo: 'https://bit.ly/3zWzJLp'
    }
  },
  bread: {
    desc: 'A community-based chat application where you can hang out with friends or find communities where people share your interests. Create a channel and start your own community or just sit back and enjoy the conversations.',
    image: {
      src: '',
      alt: 'screenshot of chat channel in bread',
      objectPosition: '0% 50%'
    },
    stack: ['Javascript', 'React', 'Css', 'Firebase'],
    links: {
      live: 'https://bit.ly/3qPqh6M',
      repo: 'https://bit.ly/3G1ADH0'
    }
  },
  "Where's Waldo": {
    desc: "Compete with players around the world for the best time in a game of Where's Waldo. 7 different levels means 7 chances to get that #1 spot.",
    image: {
      src: '',
      alt: "screenshot of where's waldo home page",
      objectPosition: '50% 50%'
    },
    stack: ['Javascript', 'React', 'Css'],
    links: {
      live: 'https://bit.ly/3nqFj1F',
      repo: 'https://bit.ly/33AWQgs'
    }
  }
};

let timer: NodeJS.Timeout | null = null;
export default function ProjectSection({
  title,
  sectionNumber,
  shouldFireAnime
}: SectionProps) {
  const { greaterThan1920px } = useContext(WindowSizeContext);
  const [startProjectAnime, setStartProjectAnime] = useState(false);

  useEffect(() => {
    if (shouldFireAnime && timer === null) {
      timer = setTimeout(() => {
        setStartProjectAnime(true);
      }, 200);
    }
  }, [shouldFireAnime]);

  useEffect(() => {
    const crochessScreen = greaterThan1920px
      ? require('../../assets/images/optimized/crochess-screen.webp')
      : require('../../assets/images/optimized/resized/crochess-screen.webp');
    const legoScreen = greaterThan1920px
      ? require('../../assets/images/optimized/lego_ecommerce-screen.webp')
      : require('../../assets/images/optimized/resized/lego_ecommerce-screen.webp');
    const breadScreen = greaterThan1920px
      ? require('../../assets/images/optimized/discord-screen.webp')
      : require('../../assets/images/optimized/resized/discord-screen.webp');
    const wheresWaldoScreen = greaterThan1920px
      ? require('../../assets/images/optimized/wheres_waldo_screen.webp')
      : require('../../assets/images/optimized/resized/wheres_waldo_screen.webp');
    projects.croChess.image.src = crochessScreen;
    projects['lego store'].image.src = legoScreen;
    projects.bread.image.src = breadScreen;
    projects["Where's Waldo"].image.src = wheresWaldoScreen;

    projects.Ether.image.src = require('../../assets/images/optimized/Sat Sep 16 03-15-51 AM PDT 2023.webp');
    projects[
      'html-spaceship'
    ].image.src = require('../../assets/images/optimized/html-spaceship-650532963638e.webp');
  }, [greaterThan1920px]);

  return (
    <section style={{ position: 'relative' }} className="main_section">
      <SectionHeader
        title={title}
        number={sectionNumber}
        shouldFireAnime={shouldFireAnime}
      />
      {Object.entries(projects).map(([pTitle, p], i) => {
        return (
          <Project
            key={i}
            title={pTitle}
            {...p}
            reverse={i % 2 === 0}
            fireAnime={startProjectAnime}
          />
        );
      })}
    </section>
  );
}
