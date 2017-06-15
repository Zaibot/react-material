import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import colors from '../colors';
import Material from '../material';
import Bar from './bar';
import cx from './style.less';
import Track from './track';
import Trackbar from './trackbar';

export interface ISliderProps {
    value: number;
    step?: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

export default ({ children, value, min, max, onChange }: ISliderProps & { children?: React.ReactNode }) => (
    <Material className={cx(`bar`)} rippleClassName={mdc(colors.bg.grey.n500)}>
      <Bar onChange={(position) => onChange(min + (max - min) * position)}>
        <Trackbar>
          <Track position={(value - min) / (max - min)} />
        </Trackbar>
      </Bar>
    </Material>
);
