import BorderRadius from './borderRadius';
import Circle from './circle';

export class Convert {
  public circleToBorderRadius(circle: Circle, size: { width: number; height: number; }) {
    const topLeftX = (size.width * .5 - circle.xCenter *.5);
    const topLeftY = (size.height * .5 - circle.yCenter *.5);
    const topRightX = (size.width * .5 + circle.xCenter *.5);
    const topRightY = (size.height * .5 - circle.yCenter *.5);
    const bottomRightX = (size.width * .5 + circle.xCenter *.5);
    const bottomRightY = (size.height * .5 - circle.yCenter *.5);
    const bottomLeftX = (size.width * .5 - circle.xCenter *.5);
    const bottomLeftY = (size.height * .5 + circle.yCenter *.5);
    return BorderRadius.empty.alter(topLeftX, topLeftY, topRightX, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY);
  }
}
export default new Convert();
