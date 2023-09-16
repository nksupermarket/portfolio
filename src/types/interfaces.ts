import { SpringRef } from 'react-spring';
import React, { RefObject } from 'react';

export interface SectionProps {
  title: {
    firstRow: string;
    secondRow: string;
  };
  sectionNumber: number;
  fireAnime: () => void;
  shouldFireAnime: boolean;
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
}

export interface Size {
  height: number;
  width: number;
}

export interface CloudInterface {
  readonly x: number;
  readonly y: number;
  readonly height: number;
  readonly width: number;
  updatePosition(): void;
}

export interface ProjectDetails {
  title: string;
  desc: string;
  image: {
    src: typeof import('*.webp') | string;
    alt: string;
    objectPosition: string;
  };
  stack: string[];
  links: {
    live: string;
    repo: string;
  };
}
