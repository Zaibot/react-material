import React from 'react';
import cx from './style.less';

export type Script = 'english' | 'dense' | 'tall';
export interface ITypographyProps {
  script?: Script;
}

export const Appbar = (script: Script) => (
  cx(`appbar--${script || 'english'}`)
);
export const Button = (script: Script) => (
  cx(`buttons--${script || 'english'}`)
);
export const Subheading = (script: Script) => (
  cx(`buttons--${script || 'english'}`)
);
export const Body1 = (script: Script) => (
  cx(`body-1--${script || 'english'}`)
);
