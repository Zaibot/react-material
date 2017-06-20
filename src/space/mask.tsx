// tslint:disable no-magic-numbers

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

    // console.log(`${width} ${Math.max(0, r * r - y * y)} ${r} ${y} ${x} ${z}`)

    const topLeftX = x;
    const topLeftY = y;
    const topRightX = x;
    const topRightY = y;
    const bottomRightX = x;
    const bottomRightY = y;
    const bottomLeftX = x;
    const bottomLeftY = y;
    return {
        borderBottomLeftRadius: `${bottomLeftX}px ${bottomLeftY}px`,
        borderBottomRightRadius: `${bottomRightX}px ${bottomRightY}px`,
        borderTopLeftRadius: `${topLeftX}px ${topLeftY}px`,
        borderTopRightRadius: `${topRightX}px ${topRightY}px`,
    };
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
    // const mulOffCenter = 1;
    // const circle = max * size * .5 * mulOffCenter;
    const mul = max /  Math.min(width, height);
    const r = calcRadius(width, height, size * mul);
    const circleX = centerX;
    const circleY = centerY;
    return `ellipse(${r}px ${r}px at ${circleX}px ${circleY}px)`;
};
