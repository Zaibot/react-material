// tslint:disable-next-line
/// <reference path="../material-design-color-palette.d.ts" />
import '@zaibot/css-reset';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import { Button } from '..';
import colors from '../colors';
import Dialog, { DialogActions, DialogContents } from '../dialog';
import Input from '../input';
import cx from './style.less';

// tslint:disable max-classes-per-file
// tslint:disable no-unsafe-any
// tslint:disable no-magic-numbers

export class Login2 extends React.Component<any, any> {
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
                            onChange={(val) => this.setState({ username: val })} />
                        <Input
                            label="Password"
                            value={this.state.password}
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
