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
import { MaterialSurfaceTest } from './surface2';

export class Form extends React.Component<any, any> {
    public state = {
        firstName: 'Tobias',
        lastName: 'de Groen',
        city: 'Arnhem',
        phoneNumber: '0633883156',
        email: 'tdgroen@zaibot.net',
    };
    public render() {
        return (
            <div className={cx(`form`)}>
                <Dialog>
                    <span style={{ position: 'absolute', right: 0, zIndex: 2 }}>
                        <ToggleMenu focus={FocusTopRight} focusMenu={FocusTopRight} menu={(e) => (
                            <Menu open>
                                <NavButton onClick={e}>Option 1</NavButton>
                                <NavButton onClick={e}>Option 2</NavButton>
                                <NavButton onClick={e}>Option 3</NavButton>
                                <NavButton onClick={e}>Option 4</NavButton>
                            </Menu>
                        )}>
                            ...
                          </ToggleMenu>
                    </span>
                    <DialogHeader>
                        Add new contact
                    </DialogHeader>
                    <DialogSubheader>
                        Enter the contact's details below and press save to continue
                </DialogSubheader>
                    <DialogContents>
                        <Input
                            label="First name"
                            value={this.state.firstName}
                            error={/\w{2,}/.test(this.state.firstName) ? null : 'Enter a first name'}
                            onChange={(val) => this.setState({ firstName: val })} />
                        <Input
                            label="Last name"
                            value={this.state.lastName}
                            error={/\w{2,}/.test(this.state.lastName) ? null : 'Enter a last name'}
                            onChange={(val) => this.setState({ lastName: val })} />
                        <Input
                            label="City"
                            value={this.state.city}
                            error={/\w{2,}/.test(this.state.city) ? null : 'Enter a city name'}
                            onChange={(val) => this.setState({ city: val })} />
                        <Input
                            label="Phone Number"
                            helper="1234567890"
                            value={this.state.phoneNumber}
                            error={/\d{10}/i.test(this.state.phoneNumber) ? null : 'Invalid phonenumber'}
                            onChange={(val) => this.setState({ phoneNumber: val })} />
                        <Input
                            label="E-mail"
                            value={this.state.email}
                            error={/@\w+\.\w{2,}/i.test(this.state.email) ? null : 'Invalid email address'}
                            onChange={(val) => this.setState({ email: val })} />
                    </DialogContents>
                    <DialogActions>
                        <Button
                            className={mdc(colors.bg.grey.n300, colors.text.black.dark)}
                            rippleClassName={mdc(colors.bg.grey.n100)}
                            slim
                            onClick={() => this.setState({ firstName: '', lastName: '', city: '', phoneNumber: '', email: '' })}>
                            Annuleren
                        </Button>
                        &nbsp;
                        <Button
                            className={mdc(colors.bg.green.n500, colors.text.white.darker)}
                            rippleClassName={mdc(colors.bg.green.n100)}
                            slim>
                            Opslaan
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
