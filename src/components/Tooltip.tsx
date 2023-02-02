import { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from '../styles/Tooltip.module.scss';
import { Direction } from '../types/types';

interface Props {
  text: string;
  direction: Direction;
  posInfo: DOMRect;
}

const Tooltip = ({ text, posInfo, direction }: Props) => {
  const toolTipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!toolTipRef.current) return;
    const toolTipHeight =
      toolTipRef.current.getBoundingClientRect().height;
    const toolTipWidth = toolTipRef.current.getBoundingClientRect().width;
    switch (direction) {
      case 'right': {
        toolTipRef.current.style.top = `${
          posInfo.top + toolTipHeight / 2 - 10
        }px`; // the 10 value represents height of arrow
        toolTipRef.current.style.left = `${posInfo.left + 82}px`;
        break;
      }
      case 'top': {
        toolTipRef.current.style.top = `${
          posInfo.top - toolTipHeight - 10
        }px`;
        toolTipRef.current.style.left = `${
          posInfo.left - toolTipWidth / 2 + posInfo.width / 2
        }px`;
        break;
      }
      case 'bottom': {
        toolTipRef.current.style.top = `${posInfo.bottom + 14}px`;
        toolTipRef.current.style.left = `${
          posInfo.left - toolTipWidth / 2 + posInfo.width / 2
        }px`;
        break;
      }
      default:
    }
  }, [direction, posInfo.top, posInfo.left, posInfo.width]);

  return ReactDOM.createPortal(
    <div className={styles.tooltip} ref={toolTipRef}>
      <div className={`${styles['tooltip-wrapper']} ${styles[direction]}`}>
        <div className={styles['text-wrapper']}>{text}</div>
      </div>
    </div>,
    document.querySelector('body') as HTMLElement
  );
};

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string,
  posInfo: PropTypes.object,
  direction: PropTypes.string
};
