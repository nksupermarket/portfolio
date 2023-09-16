import { useState } from 'react';
import { Theme } from '../types/types';

export function useSpaceship() {
  const [spaceshipActive, setSpaceshipActive] = useState(false);

  async function runSpaceship(lessThan992px: boolean, theme: Theme) {
    if (lessThan992px || spaceshipActive) return;
    const deactivate = await (
      await import('html-spaceship')
    ).default({
      theme,
      removedClass: 'remove',
      onRemove: () => setSpaceshipActive(false),
      speed: 10,
      rootEl: document.querySelector('#root') as HTMLElement,
      workerPath: process.env.PUBLIC_URL + '/workers/webWorker.js'
    });

    setSpaceshipActive(true);

    return deactivate;
  }

  return {
    runSpaceship,
    spaceshipActive
  };
}
