// tslint:disable-next-line
/// <reference path="../material-design-color-palette.d.ts" />
import '@zaibot/css-reset';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import { Button, Menu, NavButton, ToggleMenu } from '..';
import colors from '../colors';
import Dialog, { DialogActions, DialogContents, DialogHeader, DialogSubheader } from '../dialog';
import Input from '../input';
import { Material, Offset, Surface } from '../static';
import { FocusTopRight } from '../surface/focus';
import BorderRadius from '../utils/borderRadius';
import Circle from '../utils/circle';
import Position from '../utils/position';
import cx from './style.less';

// tslint:disable max-classes-per-file
// tslint:disable no-unsafe-any
// tslint:disable no-magic-numbers

export class Static extends React.Component<any, any> {
    public state = {
    };
    public render() {
        return (
            <div className={cx(`form`)}>
                <Dialog>
                    <DialogHeader>
                        Static
                    </DialogHeader>
                    <DialogContents>
                        <Material width={100} height={100} borderRadius={BorderRadius.round(3)} elevation={3}>
                            <Offset width={100} height={100} borderRadius={BorderRadius.round(3)}>
                                <Surface width={100} height={100} offset={Position.empty} className={mdc(colors.bg.red.n300)}>
                                    <span className={mdc(colors.text.black.darker)}>Content</span>
                                </Surface>
                            </Offset>
                            <Offset width={100} height={100} borderRadius={BorderRadius.round(50)}>
                                <Surface width={100} height={100} offset={Position.empty} className={mdc(colors.bg.indigo.n300)}>
                                    <span className={mdc(colors.text.white.darker)}>Content</span>
                                </Surface>
                            </Offset>
                            <Offset width={20} height={20} offset={new Position(5, 5)} borderRadius={BorderRadius.round(50)}>
                                <Surface width={100} height={100} offset={new Position(-5, -5)} className={mdc(colors.bg.grey.n50)} opacity={0.9}>
                                    <span className={mdc(colors.text.black.darker)}>Content</span>
                                </Surface>
                            </Offset>
                        </Material>
                    </DialogContents>
                    <DialogContents>
                        <Material width={100} height={100} borderRadius={BorderRadius.round(3)} elevation={3}>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * 1.0)} offset={Position.empty} className={mdc(colors.bg.red.n300)}>
                                <span className={mdc(colors.text.black.darker)}>Content</span>
                            </Surface>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * 0.8)} offset={Position.empty} className={mdc(colors.bg.indigo.n300)}>
                                <span className={mdc(colors.text.white.darker)}>Content</span>
                            </Surface>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * 0.6)} offset={Position.empty} className={mdc(colors.bg.grey.n50)} opacity={0.9}>
                                <span className={mdc(colors.text.black.darker)}>Content</span>
                            </Surface>
                        </Material>
                    </DialogContents>
                </Dialog>
            </div>
        );
    }
}
