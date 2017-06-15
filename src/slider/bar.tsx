import React from 'react';
import cx from './style.less';

export interface IBarProps {
    onHover: (position: number) => void;
    onBegin: (position: number) => void;
    onChange: (position: number) => void;
    onEnd: (position: number) => void;
}

const parsePixels = (text: string) => {
    const n = Number(text.substring(0, text.length - 2));
    if (isNaN(n)) { return 0; }
    return n;
};

const resolvePosition = (x: React.MouseEvent<HTMLDivElement>) => {
    const div = x.target as HTMLDivElement;
    const { left, width } = div.getBoundingClientRect();
    const style = window.getComputedStyle(div);
    const paddingLeft = parsePixels(style.paddingLeft);
    const paddingRight = parsePixels(style.paddingRight);
    const size = width - paddingLeft - paddingRight;
    const rel = (x.pageX - left) - paddingLeft;
    return Math.min(1, Math.max(0, rel / size));
};

export default ({ children, onHover, onBegin, onChange, onEnd }: IBarProps & { children: React.ReactNode }) => (
    <div
        className={cx(`bar`)}
        onMouseDown={(x) => onBegin(resolvePosition(x))}
        onMouseMove={(x) => { onHover(resolvePosition(x)); x.preventDefault(); }}
        onMouseUp={(x) => onEnd(resolvePosition(x))}>
        {children}
    </div>
);
