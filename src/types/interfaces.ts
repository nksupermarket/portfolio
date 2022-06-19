import { SpringRef } from 'react-spring';
import React from 'react';

export interface SectionProps {
  title: {
    firstRow: string;
    secondRow: string;
  };
  sectionNumber: number;
}

export interface AnimeComponentProps {
  ref?: SpringRef;
  children?: React.ReactNode;
  className?: string;
}
