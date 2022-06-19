import React from 'react';
import { useSpring, animated } from 'react-spring';
import { AnimeComponentProps } from '../../types/interfaces';

export default function Scale({
  animationRef,
  children,
  className
}: AnimeComponentProps) {
  const anime = useSpring({
    from: { transform: 'scale(0%)' },
    to: { transform: 'scale(100%)' },
    ref: animationRef
  });

  return (
    <animated.div className={className || ''} style={anime}>
      {children}
    </animated.div>
  );
}
