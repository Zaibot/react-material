export interface Focus { x: number; y: number; }

export const FocusTopLeft: Focus = { x: 0, y: 0 };
export const FocusTopCenter: Focus = { x: .5, y: 0 };
export const FocusTopRight: Focus = { x: 1, y: 0 };
export const FocusCenterLeft: Focus = { x: 0, y: .5 };
export const FocusCenter: Focus = { x: .5, y: .5 };
export const FocusCenterRight: Focus = { x: 1, y: .5 };
export const FocusBottomLeft: Focus = { x: 0, y: 1 };
export const FocusBottomCenter: Focus = { x: .5, y: 1 };
export const FocusBottomRight: Focus = { x: 1, y: 1 };

export default Focus;
