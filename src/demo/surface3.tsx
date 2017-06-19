// tslint:disable max-classes-per-file

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

const ProfileImage = () => <div className={cx(`profile-image`)} />;
const Small = ({ onClick }: { onClick: () => void }) => (
    <div className={cx(`profile-small`)} onClick={onClick}>
        <div className={cx(`profile-small__image`)}>
            <ProfileImage />
        </div>
        <div className={cx(`profile-small__description`)}>
            <dl>
                <dt>Tobias de Groen</dt>
                <dd>tdgroen@zaibot.net</dd>
            </dl>
        </div>
    </div>
);
const Large = ({ onClick }: { onClick: () => void }) => (
    <div className={cx(`profile-large`)} onClick={onClick}>
        <div className={cx(`profile-large__image`)}>
            <ProfileImage />
        </div>
        <div className={cx(`profile-large__description`)}>
            <dl>
                <dt>Tobias de Groen</dt>
                <dd>tdgroen@zaibot.net</dd>
            </dl>
        </div>
    </div>
);

export class SurfacePlayground3 extends React.Component<any, any> {
    public state = {
        speed: 1 as number,
        which: false,
    };

    public render() {
        const { speed, which } = this.state;
        return (
            <div className={cx(`form`)} style={{ width: `80%` }}>
                <Dialog>
                    <DialogHeader>
                        <span style={{ position: 'absolute', right: `1rem`, top: `1rem`, zIndex: 2 }}>
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
                        Surface
                    </DialogHeader>
                    <DialogSubheader>
                        Card transition
                    </DialogSubheader>
                    <DialogContents>
                        <div>
                            <label>Speed x{speed.toFixed(2)}</label>
                            <Slider value={speed} min={0} max={10} onChange={(p) => this.setState({ speed: p })} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: '0 0 50%' }}>
                                <AnimationRoot rate={speed}>
                                    <Space>
                                        <Surface
                                            center={{ x: 0, y: 0 }}
                                            focus={!which ? 1 : 0}
                                            size={!which ? 1 : 0}
                                            reserve={1}
                                            front={!which ? 1 : 0}
                                            opacity={!which ? 1 : 0}
                                            shape={!which ? 1 : 0}
                                            type={'rectangle'}>
                                            <Small onClick={this.onToggle} />
                                        </Surface>
                                        <Surface
                                            center={{ x: 0, y: 0 }}
                                            focus={which ? 1 : 0}
                                            size={which ? 1 : 0}
                                            reserve={0}
                                            front={which ? 1 : 0}
                                            opacity={which ? 1 : 0}
                                            shape={which ? 1 : 0}
                                            type={'rectangle'}>
                                            <Large onClick={this.onToggle} />
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

    private onToggle = () => {
        this.setState({ which: !this.state.which });
    }
}
