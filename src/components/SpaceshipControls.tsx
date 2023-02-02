import { createPortal } from 'react-dom';

export default function SpaceshipControls() {
  return (
    <>
      {createPortal(
        <div
          style={{
            position: 'absolute',
            top: '1em',
            left: '1em',
            zIndex: 99,
            color: 'var(--main-text)'
          }}
        >
          <div>move up: &quot;w&quot;</div>
          <div>move left: &quot;a&quot;</div>
          <div>move down: &quot;s&quot;</div>
          <div>move right: &quot;d&quot;</div>
          <div>shoot: click</div>
          <div>deactivate: &quot;spacebar&quot;</div>
        </div>,
        document.querySelector('#modal') as HTMLDivElement
      )}
    </>
  );
}
