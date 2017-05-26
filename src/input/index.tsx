import React from 'react';
import Material from '../material';
import cx from './style.less';

export interface ButtonProps {
    label: string;
    value: string;
}
export interface ButtonState {
    hover: boolean;
    pressed: boolean;
}

export default class Button extends React.Component<ButtonProps, ButtonState> {
    public state = {
        hover: false,
        pressed: false,
    };

    public render() {
        const { label, value } = this.props;
        // const { hover, pressed } = this.state;
        return (
            <div className={cx('component', { contents: value })}>
                <label className={cx('label', { contents: value })}>
                    {label}
                </label>
                <Material ripple color={'#fff'} rippleColor={'#000'} slim>
                    <input className={cx('input', { contents: value })} type="text" value={value} />
                </Material>
            </div>
        );
    }

    // private onMouseDown = () => {
    //     this.setState({ pressed: true });
    // }
    // private onMouseUp = () => {
    //     this.setState({ pressed: false });
    // }
}
