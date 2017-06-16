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
import Slider from '../slider';
import Space from '../space';
import Surface from '../surface';
import { FocusCenterLeft, FocusCenterRight, FocusTopLeft, FocusTopRight } from '../surface/focus';
import cx from './style.less';

class MaterialSurfaceTest extends React.Component<any, any> {
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
                    <Button round className={mdc(colors.bg.red.n500)} rippleClassName={mdc(colors.bg.red.n50)} onClick={this.onToggle}>...</Button>
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

// tslint:disable max-classes-per-file
interface ISurfaceValues {
    centerX: number;
    centerY: number;
    focus: number;
    size: number;
    reserve: number;
    front: number;
    opacity: number;
    shape: number;
}
class SurfaceControls extends React.Component<{ values: ISurfaceValues; onChange: (values: ISurfaceValues) => void; }, any> {
    public state = {
    };

    public render() {
        return (
            <div>
                <div>
                    <label>Preset</label>
                    <br />
                    <Button slim className={mdc(colors.bg.red.n500, colors.text.white.dark)} onClick={this.onPreset1}>1</Button>&nbsp;
                    <Button slim className={mdc(colors.bg.red.n500, colors.text.white.dark)} onClick={this.onPreset2}>2</Button>&nbsp;
                    <Button slim className={mdc(colors.bg.red.n500, colors.text.white.dark)} onClick={this.onPreset3}>3</Button>&nbsp;
                    <Button slim className={mdc(colors.bg.red.n500, colors.text.white.dark)} onClick={this.onPreset4}>4</Button>&nbsp;
                </div>
                <div>
                    <label>Center</label>
                    <Slider value={this.props.values.centerX} min={-1} max={1} onChange={(p) => this.props.onChange({ ...this.props.values, centerX: p })} />
                    <Slider value={this.props.values.centerY} min={-1} max={1} onChange={(p) => this.props.onChange({ ...this.props.values, centerY: p })} />
                </div>
                <div>
                    <label>Focus</label>
                    <Slider value={this.props.values.focus} min={0} max={1} onChange={(p) => this.props.onChange({ ...this.props.values, focus: p })} />
                </div>
                <div>
                    <label>Size</label>
                    <Slider value={this.props.values.size} min={0} max={1} onChange={(p) => this.props.onChange({ ...this.props.values, size: p })} />
                </div>
                <div>
                    <label>Reserve</label>
                    <Slider value={this.props.values.reserve} min={0} max={1} onChange={(p) => this.props.onChange({ ...this.props.values, reserve: p })} />
                </div>
                <div>
                    <label>Front</label>
                    <Slider value={this.props.values.front} min={0} max={1} onChange={(p) => this.props.onChange({ ...this.props.values, front: p })} />
                </div>
                <div>
                    <label>Opacity</label>
                    <Slider value={this.props.values.opacity} min={0} max={1} onChange={(p) => this.props.onChange({ ...this.props.values, opacity: p })} />
                </div>
                <div>
                    <label>Shape</label>
                    <Slider value={this.props.values.shape} min={0} max={1} onChange={(p) => this.props.onChange({ ...this.props.values, shape: p })} />
                </div>
            </div>
        );
    }
    private onPreset1 = () => {
        this.props.onChange({ centerX: 0, centerY: 0, focus: 0, size: 0, reserve: 0, front: 0, opacity: 0, shape: 0 });
    }
    private onPreset2 = () => {
        this.props.onChange({ centerX: 0, centerY: 0, focus: 1, size: 1, reserve: 1, front: 1, opacity: 1, shape: 1 });
    }
    private onPreset3 = () => {
        this.props.onChange({ centerX: 0, centerY: 0, focus: 1, size: 0, reserve: 0, front: 1, opacity: 1, shape: 1 });
    }
    private onPreset4 = () => {
        this.props.onChange({ centerX: 0, centerY: 0, focus: 0, size: 0, reserve: 0, front: 0, opacity: 0, shape: 0 });
    }
}
class SurfacePlayground extends React.Component<any, any> {
    public state = {
        speed: 1 as number,
        left: { centerX: 0, centerY: 0, focus: 1, size: 1, reserve: 1, front: 1, opacity: 1, shape: 1 },
        right: { centerX: 0, centerY: 0, focus: 0, size: 0, reserve: 0, front: 0, opacity: 0, shape: 0 },
    };

    public render() {
        const { speed, left, right } = this.state;
        return (
            <div className={cx(`form`)} style={{ width: `50%` }}>
                <Dialog>
                    <DialogHeader>
                        Surface
                    </DialogHeader>
                    <DialogSubheader>
                        Play with surface inputs
                    </DialogSubheader>
                    <DialogContents>
                        <div>
                            <label>Speed x{speed.toFixed(2)}</label>
                            <Slider value={speed} min={0} max={10} onChange={(p) => this.setState({ speed: p })} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '0 0 25%' }}>
                                <Button slim className={mdc(colors.bg.green.n800, colors.text.white.darker)} onClick={this.onPresetLeft2}>A</Button>&nbsp;
                            <Button slim className={mdc(colors.bg.red.n800, colors.text.white.darker)} onClick={this.onPresetRight2}>A</Button>&nbsp;
                                <SurfaceControls values={left} onChange={(s: any) => this.setState({ left: s })} />
                            </div>
                            <div style={{ flex: '0 0 25%' }}>
                                <Button slim className={mdc(colors.bg.red.n800, colors.text.white.darker)} onClick={this.onPresetLeft1}>B</Button>&nbsp;
                                <Button slim className={mdc(colors.bg.green.n800, colors.text.white.darker)} onClick={this.onPresetRight1}>B</Button>&nbsp;
                                <SurfaceControls values={right} onChange={(s: any) => this.setState({ right: s })} />
                            </div>
                            <div style={{ flex: '0 0 50%' }}>
                                <AnimationRoot rate={speed}>
                                    <Space>
                                        <Surface
                                            center={{ x: left.centerX, y: left.centerY }}
                                            focus={left.focus}
                                            size={left.size}
                                            reserve={left.reserve}
                                            front={left.front}
                                            opacity={left.opacity}
                                            shape={left.shape}
                                            type={'circle'}>
                                            <Button round className={mdc(colors.bg.red.n500)} rippleClassName={mdc(colors.bg.red.n300)}>...</Button>
                                        </Surface>
                                        <Surface
                                            center={{ x: right.centerX, y: right.centerY }}
                                            focus={right.focus}
                                            size={right.size}
                                            reserve={right.reserve}
                                            front={right.front}
                                            opacity={right.opacity}
                                            shape={right.shape}
                                            type={'rectangle'}>
                                            <Menu open>
                                                <NavButton>Option 1</NavButton>
                                                <NavButton>Option 2</NavButton>
                                                <NavButton>Option 3</NavButton>
                                                <NavButton>Option 4</NavButton>
                                                <NavButton>Option 5</NavButton>
                                                <NavButton>Option 6</NavButton>
                                            </Menu>
                                        </Surface>
                                    </Space>
                                </AnimationRoot>
                            </div>
                        </div>
                    </DialogContents>
                </Dialog>
            </div>
        );
    }

    private onPresetLeft1 = () => {
        this.setState({
            left: { ...this.state.left, focus: 1, size: 1, reserve: 1, front: 1, opacity: 1, shape: 1 },
            right: { ...this.state.right, focus: 0, size: 0, reserve: 0, front: 0, opacity: 0, shape: 0 },
        });
    }

    private onPresetLeft2 = () => {
        this.setState({
            left: { ...this.state.left, focus: 1, size: 1, reserve: 0, front: 1, opacity: 1, shape: 1 },
            right: { ...this.state.right, focus: 0, size: 0, reserve: 1, front: 0, opacity: 0, shape: 0 },
        });
    }

    private onPresetRight1 = () => {
        this.setState({
            left: { ...this.state.left, focus: 0, size: 0, reserve: 0, front: 0, opacity: 0, shape: 0 },
            right: { ...this.state.right, focus: 1, size: 1, reserve: 1, front: 1, opacity: 1, shape: 1 },
        });
    }

    private onPresetRight2 = () => {
        this.setState({
            left: { ...this.state.left, focus: 0, size: 0, reserve: 1, front: 0, opacity: 0, shape: 0 },
            right: { ...this.state.right, focus: 1, size: 1, reserve: 0, front: 1, opacity: 1, shape: 1 },
        });
    }
}

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

class Login extends React.Component<any, any> {
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

class Login2 extends React.Component<any, any> {
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

const Demo = () => (
    <AnimationRoot>
        <div style={{ margin: '10rem' }}>
            <SurfacePlayground />
        </div>
    </AnimationRoot>
);
/*

          <h2>MaterialSurfaceTest</h2>
          <MaterialSurfaceTest />

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

          <h2>Login</h2>
          <Login />

          <h2>Login</h2>
          <Login2 />

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
              <ToggleMenu focus={FocusTopLeft} menu={(e) => (
                  <Menu open>
                      <NavButton onClick={e}>Option 1</NavButton>
                      <NavButton onClick={e}>Option 2</NavButton>
                      <NavButton onClick={e}>Option 3</NavButton>
                      <NavButton onClick={e}>Option 4</NavButton>
                  </Menu>
              )}>
                  ...
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
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} inline round>0</Material>&nbsp;
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
              <Material style={{ width: 40, height: 40 }} className={mdc(`mdc-bg-grey-50`)} ambient inline round>0</Material>&nbsp;
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
/***/
document.addEventListener('DOMContentLoaded', () => { ReactDOM.render(<Demo />, document.body); });
