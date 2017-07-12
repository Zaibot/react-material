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

export interface IStaticAnimation {
    slide1: Spring;
    slide2: Spring;
}

@Animated()
export class Static extends React.Component<any, any> implements IAnimatable<IStaticAnimation> {
    public state = {
        slide1: 0,
        slide2: 0,
    };

    public onPreAnimate(time: number, advance: number, state: IStaticAnimation = { slide1: Presets.Spring100, slide2: Presets.Spring100 }) {
        return state;
    }
    public onAnimate(time: number, advance: number, state: IStaticAnimation) {
        const slide1 = state.slide1.change(Math.round(Date.now() * 1.5 / 2000) % 2).iterate(advance);
        const slide2 = state.slide2.change(Math.round(Date.now() * 0.7 / 2000) % 2).iterate(advance);
        return { slide1, slide2 };
    }

    public render() {
        const { slide1, slide2 } = this.state;
        return (
            <div className={cx(`form`)}>
                <Dialog>
                    <DialogHeader>
                        Static
                    </DialogHeader>
                    <DialogContents>
                        <Material width={100} height={100} borderRadius={BorderRadius.round(3)} elevation={3} zoom={1}>
                            <Offset width={100} height={100} borderRadius={BorderRadius.round(3)}>
                                <Surface width={100} height={100} offset={Translate.empty} opacity={1} circle={Circle.empty} className={mdc(colors.bg.red.n300)}>
                                    <span className={mdc(colors.text.black.darker)}>Content</span>
                                </Surface>
                            </Offset>
                            <Offset width={100} height={100} borderRadius={BorderRadius.round(50)}>
                                <Surface width={100} height={100} offset={Translate.empty} opacity={1} circle={Circle.empty} className={mdc(colors.bg.indigo.n300)}>
                                    <span className={mdc(colors.text.white.darker)}>Content</span>
                                </Surface>
                            </Offset>
                            <Offset width={20} height={20} offset={new Translate(5, 5)} borderRadius={BorderRadius.round(50)}>
                                <Surface width={100} height={100} offset={new Translate(-5, -5)} opacity={0.9} circle={Circle.empty} className={mdc(colors.bg.grey.n50)}>
                                    <span className={mdc(colors.text.black.darker)}>Content</span>
                                </Surface>
                            </Offset>
                        </Material>
                    </DialogContents>
                    <DialogContents>
                        <Material width={100} height={100} borderRadius={BorderRadius.round(3)} elevation={3} zoom={1}>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * 1.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.red.n300)}>
                                <span className={mdc(colors.text.black.darker)}>Content</span>
                            </Surface>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * 0.8)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.indigo.n300)}>
                                <span className={mdc(colors.text.white.darker)}>Content</span>
                            </Surface>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * 0.6)} opacity={0.9} offset={Translate.empty} className={mdc(colors.bg.grey.n50)}>
                                <span className={mdc(colors.text.black.darker)}>Content</span>
                            </Surface>
                        </Material>
                    </DialogContents>
                    <DialogContents>
                        <Material width={100} height={100} borderRadius={BorderRadius.round(3)} elevation={3} zoom={1}>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * 1.0)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.red.n300)}>
                                <span className={mdc(colors.text.black.darker)}>Content</span>
                            </Surface>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * slide1)} opacity={1} offset={Translate.empty} className={mdc(colors.bg.indigo.n300)}>
                                <span className={mdc(colors.text.white.darker)}>Content</span>
                            </Surface>
                            <Surface width={100} height={100} circle={new Circle(50, 50, Math.sqrt(50 * 50 + 50 * 50) * slide2 * .6)} opacity={0.75} offset={Translate.empty} className={mdc(colors.bg.indigo.n50)}>
                                <span style={{ color: 'red' }}>Content</span>
                            </Surface>
                        </Material>
                    </DialogContents>
                </Dialog>
            </div>
        );
    }
}
