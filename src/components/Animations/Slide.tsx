import React from 'react';
import { useSpring, animated } from 'react-spring';
import { AnimeComponentProps } from '../../types/interfaces';

interface SlideProps extends AnimeComponentProps {
  dir: 'left' | 'right' | 'up' | 'down';
}

export default function Slide({
  animationRef,
  children,
  dir,
  className,
  condition,
  config = {}
}: SlideProps) {
  let start = '';
  switch (dir) {
    case 'left':
      start = 'translateX(100vw)';
      break;
    case 'right':
      start = 'translateX(-100vw)';
      break;
    case 'up':
      start = 'translateY(100vh)';
      break;
    case 'down':
      start = 'translateY(-100vh)';
      break;
  }

  let end;
  if (condition !== undefined) {
    end = { transform: condition ? 'translate(0)' : start };
  } else {
    end = { transform: 'translate(0)' };
  }

  const animeConfig = {
    config,
    from: {
      transform: start
    },
    to: end,
    ref: animationRef
  };

  const anime = useSpring(animeConfig);

  return (
    <animated.div style={anime} className={className || ''}>
      {children}
    </animated.div>
  );
}

Slide.defaultProps = {
  config: {}
};
