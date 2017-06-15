import React from 'react';
import cx from './style.less';

export interface IBarProps {

}

export default ({ children }: IBarProps & { children: React.ReactNode }) => (
  <div className={cx(`trackbar`)}>
    {children}
  </div>
);
