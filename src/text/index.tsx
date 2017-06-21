import React from 'react';
import * as Css from './css';

export interface ITypographyProps {
  script?: Css.Script;
}

export const Appbar = ({ script, children }: ITypographyProps & { children?: React.ReactNode }) => (
  <span className={Css.Appbar(script)}>{children}</span>
);
export const Button = ({ script, children }: ITypographyProps & { children?: React.ReactNode }) => (
  <span className={Css.Button(script)}>{children}</span>
);
export const Subheading = ({ script, children }: ITypographyProps & { children?: React.ReactNode }) => (
  <span className={Css.Subheading(script)}>{children}</span>
);
export const Body1 = ({ script, children }: ITypographyProps & { children?: React.ReactNode }) => (
  <span className={Css.Body1(script)}>{children}</span>
);
