import React, { useState, useEffect } from 'react';

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function update() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return {
    greaterThan1920px: windowWidth > 1920
  };
}
