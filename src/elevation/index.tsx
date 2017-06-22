import cx from './style.less';

// tslint:disable no-magic-numbers

export type Elevation = 1 | 2 | 3 | 4 | 6 | 8 | 9 | 12 | 16 | 24;

const elevationToCss = (el: Elevation) => {
    // tslint:disable
    if (el >= 24) { return 'dialog'; }
    if (el >= 16) { return 'drawer'; }
    if (el >= 12) { return 'floating'; }
    if (el >= 9) { return 'submenu'; }
    if (el >= 8) { return 'menu'; }
    if (el >= 6) { return 'snackbar'; }
    if (el >= 4) { return 'appbar'; }
    if (el >= 3) { return 'indicator'; }
    if (el >= 2) { return 'card'; }
    if (el >= 1) { return 'switch'; }
    return '';
    // tslint:enable
};

export default (elevation: Elevation) => elevation ? cx(elevationToCss(elevation)) : null;
