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

export class Login extends React.Component<any, any> {
    public state = {
        username: '',
        password: '',
    };
    public render() {
        return (
            <div className={cx(`form`)}>
                <Dialog>
                    <DialogContents>
                        <Input
                            label="Username"
                            value={this.state.username}
                            error={/\w{2,}/.test(this.state.username) ? null : 'Enter a username'}
                            onChange={(val) => this.setState({ username: val })} />
                        <Input
                            label="Password"
                            value={this.state.password}
                            error={/\w{2,}/.test(this.state.password) ? null : 'Atleast 8 characters'}
                            onChange={(val) => this.setState({ password: val })} />
                    </DialogContents>
                    <DialogActions>
                        <Button
                            className={mdc(colors.bg.grey.n300, colors.text.black.dark)}
                            rippleClassName={mdc(colors.bg.grey.n100)}
                            slim
                            onClick={() => this.setState({ username: '', password: '' })}>
                            Cancel
                        </Button>
                        &nbsp;
                        <Button
                            className={mdc(colors.bg.green.n500, colors.text.white.darker)}
                            rippleClassName={mdc(colors.bg.green.n100)}
                            slim>
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}