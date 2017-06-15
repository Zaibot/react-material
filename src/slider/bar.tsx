import React from 'react';
import cx from './style.less';

export interface IBarProps {
    onChange: (position: number) => void;
}

const parsePixels = (text: string) => {
    const n = Number(text.substring(0, text.length - 2));
    if (isNaN(n)) { return 0; }
    return n;
};

export default ({ children, onChange }: IBarProps & { children: React.ReactNode }) => (
    <div className={cx(`bar`)} onMouseDown={(x) => {
        const div = x.target as HTMLDivElement;
        const { left, width } = div.getBoundingClientRect();
        const style = window.getComputedStyle(div);
        const paddingLeft = parsePixels(style.paddingLeft);
        const paddingRight = parsePixels(style.paddingRight);
        const size = width - paddingLeft - paddingRight;
        const rel = (x.pageX - left) - paddingLeft;
        onChange(Math.min(1, Math.max(0, rel / size)));
    }} onMouseMove={(x) => {
        const div = x.target as HTMLDivElement;
        const { left, width } = div.getBoundingClientRect();
        const style = window.getComputedStyle(div);
        const paddingLeft = parsePixels(style.paddingLeft);
        const paddingRight = parsePixels(style.paddingRight);
        const size = width - paddingLeft - paddingRight;
        const rel = (x.pageX - left) - paddingLeft;
        onChange(Math.min(1, Math.max(0, rel / size)));
    }}>
        {children}
    </div>
);
