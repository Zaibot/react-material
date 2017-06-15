import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import Material from '../material';
import cx from './style.less';

export interface ITrackProps {
    position: number;
}

export default ({ children, position }: ITrackProps & { children?: React.ReactNode }) => (
  <Material className={cx(`track`, mdc(colors.bg.indigo.n500))} rippleClassName={mdc(colors.bg.indigo.n50)} ripple slim style={{ left: `${(position * 100).toFixed(2)}%` }} elevation={2}>
    {children}
  </Material>
);
// export default ({ children, position }: ITrackProps & { children?: React.ReactNode }) => (
//     <div className={cx(`track`)} style={{ left: `${(position * 100).toFixed(2)}%` }}>
//     </div>
//);
