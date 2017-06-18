// tslint:disable no-magic-numbers

export const calcBorderRadius = (width: number, height: number, size: number, centerX: number, centerY: number, rounding: number) => {
    const snap = width > height ? height : width;
    const topLeftX = snap * rounding * 0.5 * (size);
    const topLeftY = snap * rounding * 0.5 * (size);
    const topRightX = snap * rounding * 0.5 * (size);
    const topRightY = snap * rounding * 0.5 * (size);
    const bottomRightX = snap * rounding * 0.5 * (size);
    const bottomRightY = snap * rounding * 0.5 * (size);
    const bottomLeftX = snap * rounding * 0.5 * (size);
    const bottomLeftY = snap * rounding * 0.5 * (size);
    return {
      borderTopLeftRadius: `${topLeftX}px ${topLeftY}px`,
      borderTopRightRadius: `${topRightX}px ${topRightY}px`,
      borderBottomRightRadius: `${bottomRightX}px ${bottomRightY}px`,
      borderBottomLeftRadius: `${bottomLeftX}px ${bottomLeftY}px`,
    };
};
export const calcClipPath = (width: number, height: number, size: number, centerX: number, centerY: number) => {
    const max = Math.sqrt(width * width + height * height);
    const mulOffCenter = 1;
    const circle = max * size * .5 * mulOffCenter;
    const circleX = centerX;
    const circleY = centerY;
    return `ellipse(${circle}px ${circle}px at ${circleX}px ${circleY}px)`;
};
