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
  condition
}: SlideProps) {
  let transform = '';
  switch (dir) {
    case 'left':
      transform = 'translateX(100vw)';
      break;
    case 'right':
      transform = 'translateX(-100vw)';
      break;
    case 'up':
      transform = 'translateY(100vh)';
      break;
    case 'down':
      transform = 'translateY(-100vh)';
      break;
  }

  let to;
  if (condition !== undefined) {
    to = { transform: condition ? 'translate(0%)' : transform };
  } else {
    to = { transform: 'translate(0%)' };
  }

  const anime = useSpring({
    from: {
      transform
    },
    to,
    ref: animationRef
  });

  if (condition) {
    console.log({ to, anime });
  }

  return (
    <animated.div style={anime} className={className || ''}>
      {children}
    </animated.div>
  );
}
