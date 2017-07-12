// tslint:disable no-magic-numbers

import BorderRadius from '../utils/borderRadius';
import Circle from '../utils/circle';

export const calcRadius = (width: number, height: number, size: number) => {
    // const max = Math.sqrt(width * width + height * height);
    const max = Math.min(width, height);
    return max * size * .5;
};
export const calcRadius2 = (width: number, height: number, size: number) => {
    // const max = Math.sqrt(width * width + height * height);
    const max = Math.max(width, height);
    return max * size * .5;
};

const circleY = (width: number, height: number, rounding: number) => {
  const r = width * rounding * .5; // calcRadius(width, height, rounding);
  const y = width * .5;
  const x = Math.sqrt(Math.max(0, r * r - y * y));
  const z = r - x;
  return z;
};
const circleX = (width: number, height: number, rounding: number) => {
  const r = height * rounding * .5; // calcRadius2(width, height, rounding);
  const y = height * .5;
  const x = Math.sqrt(Math.max(0, r * r - y * y));
  const z = r - x;
  return z;
};

export const calcBorderRadius = (width: number, height: number, size: number, centerX: number, centerY: number, rounding: number) => {
    const snap = width > height ? height : width;
    const x = circleX(width, height, rounding);
    const y = circleY(width, height, rounding);

    return { borderRadius: new BorderRadius(x, y, x, y, x, y, x, y).toBorderRadius() };
};
export const calcSize = (width: number, height: number, size: number, centerX: number, centerY: number, rounding: number) => {
    const snap = width > height ? height : width;
    const r = calcRadius(width, height, 1) * rounding + calcRadius2(width, height, 1) * (1 - rounding);
    const y = (width) * .5;
    const x = Math.sqrt(Math.max(0, r * r - y * y));
    const z = r - x;

    return {
        height: `${Math.min(r * 2, height).toFixed(1)}px`,
        width: `${Math.min(r * 2, width).toFixed(1)}px`,
    };
};
export const calcClipPath = (width: number, height: number, size: number, centerX: number, centerY: number) => {
    const max = Math.sqrt(width * width + height * height);
    const mul = max /  Math.min(width, height);
    const r = calcRadius(width, height, size * mul);
    return new Circle(centerX, centerY, r).toClipPath();
};
