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

// tslint:disable max-classes-per-file
// tslint:disable no-unsafe-any
// tslint:disable no-magic-numbers

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
export class SurfacePlayground extends React.Component<any, any> {
    public state = {
        speed: 1 as number,
        debug: false,
        left: { centerX: 0, centerY: 0, focus: 1, size: 1, reserve: 1, front: 1, opacity: 1, shape: 1 },
        right: { centerX: 0, centerY: 0, focus: 0, size: 0, reserve: 0, front: 0, opacity: 0, shape: 0 },
    };

    public render() {
        const { speed, left, right, debug } = this.state;
        return (
            <div className={cx(`form`)} style={{ width: `80%` }}>
                <Dialog>
                    <DialogHeader>
                        <span style={{ position: 'absolute', right: `1rem`, top: `1rem`, zIndex: 2 }}>
                            <ToggleMenu focus={FocusTopRight} focusMenu={FocusTopRight} menu={(e) => (
                                <Menu className={mdc(colors.bg.grey.n50)} open>
                                    <NavButton onClick={e}>Option 1</NavButton>
                                    <NavButton onClick={e}>Option 2</NavButton>
                                    <NavButton onClick={e}>Option 3</NavButton>
                                    <NavButton onClick={e}>Option 4</NavButton>
                                </Menu>
                            )}>
                                ...
                              </ToggleMenu>
                        </span>
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
                        <div>
                            <Button
                                raised
                                className={cx(
                                    debug ? mdc(colors.bg.red.n800) : mdc(colors.bg.grey.n100),
                                    debug ? mdc(colors.text.white.darker) : mdc(colors.text.black.darker),
                                )}
                                rippleClassName={debug ? mdc(colors.bg.red.n300) : mdc(colors.bg.grey.n300)}
                                onClick={this.onToggleDebug}>
                                {debug ? 'Debug' : 'Normal'}
                            </Button>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '0 0 25%' }}>
                                <Button
                                    slim
                                    className={mdc(colors.bg.green.n800, colors.text.white.darker)}
                                    rippleClassName={mdc(colors.bg.green.n50)}
                                    onClick={this.onPreset1A}>
                                    A
                                  </Button>&nbsp;
                                <Button
                                    slim
                                    className={mdc(colors.bg.green.n800, colors.text.white.darker)}
                                    rippleClassName={mdc(colors.bg.green.n50)}
                                    onClick={this.onPreset1B}>
                                    B
                                  </Button>&nbsp;
                                <SurfaceControls values={left} onChange={(s: any) => this.setState({ left: s })} />
                            </div>
                            <div style={{ flex: '0 0 25%' }}>
                                <Button
                                    slim
                                    className={mdc(colors.bg.red.n800, colors.text.white.darker)}
                                    rippleClassName={mdc(colors.bg.red.n50)}
                                    onClick={this.onPreset2A}>
                                    A
                                  </Button>&nbsp;
                            <Button
                                    slim
                                    className={mdc(colors.bg.red.n800, colors.text.white.darker)}
                                    rippleClassName={mdc(colors.bg.red.n50)}
                                    onClick={this.onPreset2B}>
                                    B
                                  </Button>&nbsp;
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
                                            <Button
                                                round
                                                className={debug ? mdc(colors.bg.red.n500) : mdc(colors.bg.grey.n50)}
                                                rippleClassName={debug ? mdc(colors.bg.red.n300) : mdc(colors.bg.grey.n300)}>
                                                ...
                                            </Button>
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
                                            <Menu className={debug ? mdc(colors.bg.blue.n500) : mdc(colors.bg.grey.n50)} open>
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

    private onToggleDebug = () => {
        this.setState({
            debug: !this.state.debug,
        });
    }

    private onPreset1A = () => {
        this.setState({
            left: { ...this.state.left, focus: 1, size: 1, reserve: 1, front: 1, opacity: 1, shape: 1 },
            right: { ...this.state.right, focus: 0, size: 0, reserve: 0, front: 0, opacity: 0, shape: 0 },
        });
    }

    private onPreset2A = () => {
        this.setState({
            left: { ...this.state.left, focus: 1, size: 1, reserve: 0, front: 1, opacity: 1, shape: 1 },
            right: { ...this.state.right, focus: 0, size: 0, reserve: 1, front: 0, opacity: 0, shape: 0 },
        });
    }

    private onPreset2B = () => {
        this.setState({
            left: { ...this.state.left, focus: 0, size: 0, reserve: 0, front: 0, opacity: 0, shape: 0 },
            right: { ...this.state.right, focus: 1, size: 1, reserve: 1, front: 1, opacity: 1, shape: 1 },
        });
    }

    private onPreset1B = () => {
        this.setState({
            left: { ...this.state.left, focus: 0, size: 0, reserve: 1, front: 0, opacity: 0, shape: 0 },
            right: { ...this.state.right, focus: 1, size: 1, reserve: 0, front: 1, opacity: 1, shape: 1 },
        });
    }
}
