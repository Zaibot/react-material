// tslint:disable-next-line
/// <reference path="../material-design-color-palette.d.ts" />

// tslint:disable max-classes-per-file

import '@zaibot/css-reset';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AnimationRoot, Button, Material, Menu, NavButton, ToggleMenu } from '..';
import colors from '../colors';
import Dialog, { DialogActions, DialogContents, DialogHeader, DialogSubheader } from '../dialog';
import Input from '../input';
import Slider from '../slider';
import Space from '../space';
import Surface from '../surface';
import { FocusCenterLeft, FocusCenterRight, FocusTopLeft, FocusTopRight } from '../surface/focus';
import cx from './style.less';

import { SurfacePlayground } from './surface';

export class MaterialSurfaceTest extends React.Component<any, any> {
    public state = {
        primary: true,
    };

    public render() {
        const { primary } = this.state;
        return (
            <Space>
                <Surface
                    center={FocusCenterLeft}
                    focus={1}
                    size={primary ? 1 : 0}
                    reserve={1}
                    front={primary ? 1 : 0}
                    opacity={primary ? 1 : 0}
                    shape={primary ? 1 : 0}
                    type={'circle'} >
                    <Button round className={mdc(colors.bg.grey.n50)} rippleClassName={mdc(colors.bg.red.n50)} onClick={this.onToggle}>...</Button>
                </Surface>
                <Surface
                    center={FocusCenterLeft}
                    focus={0}
                    size={primary ? 0 : 1}
                    reserve={0}
                    front={primary ? 0 : 1}
                    opacity={primary ? 0 : 1}
                    shape={primary ? 0 : 1}
                    type={'rectangle'} >
                    <Menu open>
                        <NavButton onClick={this.onToggle}>Option 1</NavButton>
                        <NavButton onClick={this.onToggle}>Option 2</NavButton>
                        <NavButton onClick={this.onToggle}>Option 3</NavButton>
                        <NavButton onClick={this.onToggle}>Option 4</NavButton>
                        <NavButton onClick={this.onToggle}>Option 5</NavButton>
                        <NavButton onClick={this.onToggle}>Option 6</NavButton>
                    </Menu>
                </Surface>
            </Space>
        );
    }

    private onToggle = () => {
        const primary = !this.state.primary;
        this.setState({ primary });
    }
}
