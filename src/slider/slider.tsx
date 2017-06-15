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
    onHover: (value: number) => void;
    onBegin: (value: number) => void;
    onChange: (value: number) => void;
    onEnd: (value: number) => void;
}

export default ({ children, value, min, max, onHover, onBegin, onChange, onEnd }: ISliderProps & { children?: React.ReactNode }) => (
    <Material className={cx(`bar`)} rippleClassName={mdc(colors.bg.grey.n500)}>
        <Bar
            onHover={(position) => onHover(min + (max - min) * position)}
            onBegin={(position) => onBegin(min + (max - min) * position)}
            onChange={(position) => onChange(min + (max - min) * position)}
            onEnd={(position) => onEnd(min + (max - min) * position)}>
            <Trackbar>
                <Track position={(value - min) / (max - min)} />
            </Trackbar>
        </Bar>
    </Material>
);
