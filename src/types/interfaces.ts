import { SpringRef } from 'react-spring';
import React from 'react';

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
  animationRef?: SpringRef;
  children?: React.ReactNode;
  className?: string;
  condition?: boolean;
  config: AnimeConfig;
  onRest?: () => void;
}
