// tslint:disable no-magic-numbers

export const calcRadius = (width: number, height: number, size: number) => {
    // const max = Math.sqrt(width * width + height * height);
    const max = Math.min(width, height);
    return max * size * .5;
};

export const calcBorderRadius = (width: number, height: number, size: number, centerX: number, centerY: number, rounding: number) => {
    const snap = width > height ? height : width;
    const r = calcRadius(width, height, rounding * rounding);
    const y = (width) * .5;
    const x = Math.sqrt(Math.max(0, r * r - y * y));
    const z = r - x;

    // console.log(`${width} ${Math.max(0, r * r - y * y)} ${r} ${y} ${x} ${z}`)

    const topLeftX = snap * .5;
    const topLeftY = z;
    const topRightX = snap * .5;
    const topRightY = z;
    const bottomRightX = snap * .5;
    const bottomRightY = z;
    const bottomLeftX = snap * .5;
    const bottomLeftY = z;
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
