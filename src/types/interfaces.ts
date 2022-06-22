import { SpringRef } from 'react-spring';
import React, { RefObject } from 'react';

export interface SectionProps {
  title: {
    firstRow: string;
    secondRow: string;
  };
  sectionNumber: number;
}

interface AnimeConfig {
  mass?: number;
  tension?: number;
  friction?: number;
  clamp?: boolean;
  precision?: number;
  velocity?: number;
  damping?: number;
  frequency?: number;
  bounce?: number;
}

export interface AnimeComponentProps {
  elRef?:
    | RefObject<HTMLDivElement>
    | null
    | ((ref: HTMLDivElement) => void);
  animationRef?: SpringRef;
  children?: React.ReactNode;
  className?: string;
  condition?: boolean;
  config: AnimeConfig;
  onRest?: () => void;
}
