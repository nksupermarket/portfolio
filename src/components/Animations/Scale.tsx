import { animated, useSpring } from 'react-spring';
import { AnimeComponentProps } from '../../types/interfaces';

export default function Scale({
  elRef,
  animationRef,
  children,
  className,
  condition,
  config
}: AnimeComponentProps) {
  let to;
  if (condition !== undefined) {
    to = { transform: condition ? 'scale(100%)' : 'scale(0%)' };
  } else {
    to = { transform: 'scale(100%)' };
  }

  const anime = useSpring({
    from: { transform: 'scale(0%)' },
    to,
    ref: animationRef,
    config
  });

  return (
    <animated.div ref={elRef} className={className || ''} style={anime}>
      {children}
    </animated.div>
  );
}

Scale.defaultProps = {
  config: {}
};
