import moize from 'moize';
import React from 'react';
import cx from './style.less';

const dec = 1;

export interface IOffsetProps {
    className: string;
    top: number;
    left: number;
}

export default moize.react(
    ({ children, className, top: topInput, left: leftInput }: IOffsetProps & { children: React.ReactNode }) => {
        const top = topInput === undefined ? topInput : topInput.toFixed(dec);
        const left = leftInput === undefined ? leftInput : leftInput.toFixed(dec);
        const transform = `translate(${top}px, ${left}px)`;

        return (
            <div className={cx(`offset`, className)} style={{ transform }}>
                {children}
            </div>
        );
    },
);
