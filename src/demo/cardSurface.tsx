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
        <div className={cx(`profile-large__banner`)}>
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
        <div className={cx(`profile-large__content`)}>
            <dl>
                <dd>+31 6 33883156</dd>
                <dd>Arnhem</dd>
            </dl>
        </div>
    </div>
);

class CardDemo extends React.Component<any, any> {
    public state = {
        which: false,
    };

    public render() {
        const { which } = this.state;
        return (
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
        );
    }

    private onToggle = () => {
        this.setState({ which: !this.state.which });
    }
}

export class CardSurface extends React.Component<any, any> {
    public state = {
        speed: 1 as number,
    };

    public render() {
        const { speed } = this.state;
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
                        Cards
                    </DialogHeader>
                    <DialogSubheader>
                        Card transition
                    </DialogSubheader>
                    <DialogContents>
                        <div>
                            <label>Speed x{speed.toFixed(2)}</label>
                            <Slider value={speed} min={0} max={10} onChange={(p) => this.setState({ speed: p })} />
                        </div>
                        <div style={{ display: 'flex', padding: '5rem' }}>
                            <AnimationRoot rate={speed}>
                                <div style={{ flex: '0 0 50%' }}>
                                    <CardDemo />
                                    <CardDemo />
                                    <CardDemo />
                                    <CardDemo />
                                </div>
                            </AnimationRoot>
                        </div>
                    </DialogContents>
                </Dialog>
            </div>
        );
    }
}
