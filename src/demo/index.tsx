// tslint:disable-next-line
/// <reference path="../material-design-color-palette.d.ts" />

import '@zaibot/css-reset';
import mdc from 'material-design-color-palette/css/material-design-color-palette.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AnimationRoot, Button, Material, Menu, NavButton, ToggleMenu } from '..';
import colors from '../colors';
import Dialog, { DialogActions, DialogContents, DialogHeader, DialogSubheader } from '../dialog';
import Input from '../input';
import cx from './style.less';

class Form extends React.Component<any, any> {
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
                    <span style={{ position: 'absolute', right: 0, zIndex: 2, width: 105 }}>
                        <ToggleMenu menu={(e) => (
                            <Menu open>
                                <NavButton onClick={e}>Option 1</NavButton>
                                <NavButton onClick={e}>Option 2</NavButton>
                                <NavButton onClick={e}>Option 3</NavButton>
                                <NavButton onClick={e}>Option 4</NavButton>
                            </Menu>
                        )}>Test</ToggleMenu>
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
                        <Button className={mdc(colors.bg.grey.n300, colors.text.black.dark)} rippleClassName={mdc(colors.bg.grey.n100)} slim onClick={() => this.setState({ firstName: '', lastName: '', city: '', phoneNumber: '', email: '' })}>Annuleren</Button>
                        &nbsp;
                    <Button className={mdc(colors.bg.green.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.green.n100)} slim>Opslaan</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const Demo = () => (
    <AnimationRoot>
        <div>
            <h2>Rounded Card</h2>
            <Material
                className={mdc(colors.bg.grey.n50, colors.text.black.dark)}
                rippleClassName={mdc(colors.bg.grey.n500)}
                rounded card>Panel</Material>

            <h2>Rounded Ripple Card</h2>
            <Material
                className={mdc(colors.bg.grey.n50, colors.text.black.dark)}
                rippleClassName={mdc(colors.bg.grey.n500)}
                rounded ripple card>Panel</Material>

            <h2>Rounded Ambient Ripple Card</h2>
            <Material
                className={mdc(colors.bg.grey.n50, colors.text.black.dark)}
                rippleClassName={mdc(colors.bg.grey.n500)}
                rounded ambient ripple card>Panel</Material>

            <h2>Input</h2>
            <Input label="Label" value="Hello" />

            <h2>Form</h2>
            <Form />

            <h2>Button</h2>
            <Button className={mdc(colors.bg.indigo.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.indigo.n100)}>Button</Button>
            &nbsp;
            <Button className={mdc(colors.bg.indigo.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.indigo.n100)} accent>Button</Button>

            <h2>Raised Button</h2>
            <Button className={mdc(colors.bg.cyan.n600, colors.text.white.darker)} rippleClassName={mdc(colors.bg.cyan.n100)} raised>Button</Button>
            &nbsp;
            <Button className={mdc(colors.bg.cyan.n600, colors.text.white.darker)} rippleClassName={mdc(colors.bg.cyan.n100)} raised accent>Button</Button>

            <h2>Raised Ambient Button</h2>
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} raised ambient>Button</Button>
            &nbsp;
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} raised ambient accent>Button</Button>

            <h2>Floating Button</h2>
            <Button className={mdc(colors.bg.cyan.n600, colors.text.white.darker)} rippleClassName={mdc(colors.bg.cyan.n100)} floating>Button</Button>
            &nbsp;
            <Button className={mdc(colors.bg.cyan.n600, colors.text.white.darker)} rippleClassName={mdc(colors.bg.cyan.n100)} floating accent>Button</Button>

            <h2>Floating Ambient Button</h2>
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} floating ambient>Button</Button>
            &nbsp;
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} floating ambient accent>Button</Button>

            <h2>Round Button</h2>
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round>B</Button>
            &nbsp;
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round accent>B</Button>

            <h2>Floating Round Button</h2>
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round floating>B</Button>&nbsp;
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round floating big>B</Button>&nbsp;
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round floating accent>B</Button>&nbsp;
            <Button className={mdc(colors.bg.red.n500, colors.text.white.darker)} rippleClassName={mdc(colors.bg.red.n100)} round floating big accent>B</Button>&nbsp;

            <h2>Nav Button</h2>
            <NavButton>B</NavButton>&nbsp;
            <NavButton raised>B</NavButton>&nbsp;
            <NavButton accent>B</NavButton>&nbsp;
            <NavButton raised accent>B</NavButton>&nbsp;

            <h2>Menu</h2>
            <div style={{ height: 300 }}>
                <Menu open>
                    <NavButton>Option 1</NavButton>
                    <NavButton>Option 2</NavButton>
                    <NavButton>Option 3</NavButton>
                    <NavButton>Option 4</NavButton>
                </Menu>
            </div>

            <h2>Toggle Menu</h2>
            <div style={{ height: 300 }}>
                <ToggleMenu menu={(e) => (
                    <Menu open>
                        <NavButton onClick={e}>Option 1</NavButton>
                        <NavButton onClick={e}>Option 2</NavButton>
                        <NavButton onClick={e}>Option 3</NavButton>
                        <NavButton onClick={e}>Option 4</NavButton>
                    </Menu>
                )}>
                    Test
                </ToggleMenu>
            </div>

            <h2>Dialog</h2>
            <div style={{ height: 200 }}>
                <Material className={cx(`dialog`, mdc(`mdc-bg-grey-50`))} dialog ripple style={{ position: 'absolute', left: '50%', transform: `translate(-50%, 0)` }}>
                    <h2 className={cx(`dialogtitle`, mdc(`mdc-text-black-darker`))}>Title goes here</h2>
                    <p className={cx(`dialogcontent`, mdc(`mdc-text-black-dark`))}>
                        I'm a thing. But like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making.
                </p>
                </Material>
            </div>

            <h2>Dialog Ambient</h2>
            <div style={{ height: 200 }}>
                <Material className={cx(`dialog`, mdc(`mdc-bg-grey-50`))} dialog ripple ambient style={{ position: 'absolute', left: '50%', transform: `translate(-50%, 0)` }}>
                    <h2 className={cx(`dialogtitle`, mdc(`mdc-text-black-darker`))}>Title goes here</h2>
                    <p className={cx(`dialogcontent`, mdc(`mdc-text-black-dark`))}>
                        I'm a thing. But like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making.
                </p>
                </Material>
            </div>

            <h2>Elevations</h2>
            <div style={{ height: 200 }}>
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round>0</Material>
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={1}>1</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={2}>2</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={3}>3</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={4}>4</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={6}>6</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={8}>8</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={9}>9</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={12}>12</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={16}>16</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round elevation={24}>24</Material>&nbsp;
            </div>
            <h2>Ambient Elevations</h2>
            <div style={{ height: 200 }}>
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round>0</Material>
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={1}>1</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={2}>2</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={3}>3</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={4}>4</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={6}>6</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={8}>8</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={9}>9</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={12}>12</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={16}>16</Material>&nbsp;
                <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round elevation={24}>24</Material>&nbsp;
            </div>
        </div>
    </AnimationRoot>
);
document.addEventListener('DOMContentLoaded', () => { ReactDOM.render(<Demo />, document.body); });
