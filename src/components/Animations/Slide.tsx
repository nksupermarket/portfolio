import React from 'react';
import { useSpring, animated } from 'react-spring';
import { AnimeComponentProps } from '../../types/interfaces';

interface SlideProps extends AnimeComponentProps {
  tag: keyof JSX.IntrinsicElements;
  start: { [key: string]: string };
  end: { [key: string]: string };
}

export default function Slide({
  start,
  end,
  animationRef,
  children,
  className,
  config = {},
  elRef,
  tag = 'div'
}: SlideProps) {
  const animeConfig = {
    config,
    from: start,
    to: end,
    ref: animationRef
  };

  const anime = useSpring(animeConfig);

  switch (tag) {
    case 'h2':
      return (
        <animated.h2 ref={elRef} style={anime} className={className || ''}>
          {children}
        </animated.h2>
      );
    case 'div':
    default:
      return (
        <animated.div
          ref={elRef}
          style={anime}
          className={className || ''}
        >
          {children}
        </animated.div>
      );
  }
}

Slide.defaultProps = {
  config: {},
  tag: 'div'
};
