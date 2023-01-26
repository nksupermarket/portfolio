import React, { RefObject } from 'react';
import { animated, SpringValue } from 'react-spring';

interface CloudSvgProps {
  className?: string;
  style?: {
    transform: SpringValue<string>;
  };
  listRef?:
    | ((instance: SVGSVGElement | null) => void)
    | RefObject<SVGSVGElement>
    | null
    | undefined;
}

export default function CloudSvg({
  className,
  style,
  listRef
}: CloudSvgProps) {
  const rootClasses = [];
  if (className) rootClasses.push(className);
  return (
    <animated.svg
      ref={listRef}
      className={rootClasses.join(' ')}
      style={style}
      width="32%"
      height="100%"
      version="1.1"
      fill="currentColor"
      viewBox="0 0 700 700"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="m234.38 274.3c0.32813-0.49219 0.57422-1.0664 0.82031-1.6406-1.8047-4.7578-3.1992-9.6797-4.1836-14.684-1.1484-5.8242-1.7227-11.812-1.7227-17.719 0-24.691 9.8438-48.066 27.398-65.375 17.719-17.473 41.422-27.07 66.277-27.07 21.41 0 41.996 7.1367 58.73 20.426 16.488 13.125 28.629 31.418 32.812 52.25v0.082031c10.008-10.418 23.461-15.75 37.898-14.355 8.0391 0.82031 15.832 3.6094 22.559 8.0391 6.7266 4.3477 12.387 10.336 16.16 17.391 6.6445 12.305 7.1367 26.25 1.2305 38.965 0.082031 0.082031 0.082031 0.16406 0.16406 0.24609 18.211 1.0664 35.273 8.8594 47.902 21.984 12.551 13.125 19.605 30.434 19.605 48.559 0 18.867-7.5469 36.75-21 50.035-13.535 13.371-31.664 20.672-50.691 20.672h-276.6c-19.031 0-37.16-7.3828-50.691-20.672-13.453-13.207-21-31.09-21-50.035 0-18.867 7.5469-36.75 21-50.035 13.535-13.371 31.664-20.672 50.691-20.672 4.1836 0 8.3672 0.32812 12.469 1.0664 1.0664 0.16406 2.1328 0.32813 3.1992 0.57422 2.4609 0.41016 4.7578 1.1484 6.9727 1.9688z"
        fillRule="evenodd"
      />
    </animated.svg>
  );
}
