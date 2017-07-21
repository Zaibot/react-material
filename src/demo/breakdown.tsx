// tslint:disable-next-line
/// <reference path="../material-design-color-palette.d.ts" />
import '@zaibot/css-reset';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import { Animated, Button, IAnimatable, Menu, NavButton, Presets, Spring, ToggleMenu } from '..';
import colors from '../colors';
import Dialog, { DialogActions, DialogContents, DialogHeader, DialogSubheader } from '../dialog';
import Input from '../input';
import { Material, Offset, Surface } from '../presentational';
import { FocusTopRight } from '../surface/focus';
import BorderRadius from '../utils/borderRadius';
import Circle from '../utils/circle';
import Translate from '../utils/translate';
import cx from './style.less';

// tslint:disable max-classes-per-file
// tslint:disable no-unsafe-any
// tslint:disable no-magic-numbers
// tslint:disable max-line-length

export class Breakdown extends React.Component<any, any> {
    public render() {
        const w = 120;
        const h = 40;
        return (
            <div className={cx(`form`)}>
                <Dialog>
                    <DialogHeader>
                        Breakdown
                    </DialogHeader>
                    <DialogContents>
                        <Material width={w} height={h} borderRadius={BorderRadius.round(3)} elevation={3} zoom={1}>
                            <Surface width={w} height={h} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 1.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.red.n300)}>
                                <span className={mdc(colors.text.black.darker)}>0%</span>
                            </Surface>
                            <Surface width={w} height={h} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 0.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.indigo.n300)}>
                                <span className={mdc(colors.text.white.darker)}>0%</span>
                            </Surface>
                        </Material>
                    </DialogContents>
                    <DialogContents>
                        <Material width={w} height={h} borderRadius={BorderRadius.round(3)} elevation={3} zoom={1}>
                            <Surface width={w} height={h} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 1.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.red.n300)}>
                                <span className={mdc(colors.text.black.darker)}>25%</span>
                            </Surface>
                            <Surface width={w} height={h} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 0.25)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.indigo.n300)}>
                                <span className={mdc(colors.text.white.darker)}>25%</span>
                            </Surface>
                        </Material>
                    </DialogContents>
                    <DialogContents>
                        <Material width={w} height={h} borderRadius={BorderRadius.round(3)} elevation={3} zoom={1}>
                            <Surface width={w} height={h} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 1.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.red.n300)}>
                                <span className={mdc(colors.text.black.darker)}>50%</span>
                            </Surface>
                            <Surface width={w} height={h} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 0.5)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.indigo.n300)}>
                                <span className={mdc(colors.text.white.darker)}>50%</span>
                            </Surface>
                        </Material>
                    </DialogContents>
                    <DialogContents>
                        <Material width={120} height={40} borderRadius={BorderRadius.round(3)} elevation={3} zoom={1}>
                            <Surface width={120} height={40} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 1.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.red.n300)}>
                                <span className={mdc(colors.text.black.darker)}>75%</span>
                            </Surface>
                            <Surface width={120} height={40} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 0.75)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.indigo.n300)}>
                                <span className={mdc(colors.text.white.darker)}>75%</span>
                            </Surface>
                        </Material>
                    </DialogContents>
                    <DialogContents>
                        <Material width={120} height={40} borderRadius={BorderRadius.round(3)} elevation={3} zoom={1}>
                            <Surface width={120} height={40} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 1.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.red.n300)}>
                                <span className={mdc(colors.text.black.darker)}>100%</span>
                            </Surface>
                            <Surface width={120} height={40} circle={new Circle(w*0.5, h*0.5, Math.sqrt(w * w * .25 + h * h * .25) * 1.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.indigo.n300)}>
                                <span className={mdc(colors.text.white.darker)}>100%</span>
                            </Surface>
                        </Material>
                    </DialogContents>
                </Dialog>
            </div>
        );
    }
}
