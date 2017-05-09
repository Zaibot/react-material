import React from 'react';
import { RootSymbol, GetRoot, Animated } from '../animationroot';
import Material from '../material';
import Content from '../content';
import cx from './style.less';

export type MenuProps = {
    disabled?: boolean;
    accent?: boolean;
    onClick?: any;
    open: boolean;
};
export type MenuState = {
    currentw: number;
    currenth: number;
    height: number;
    width: number;
    toggle: number;
};

@Animated
export default class Menu extends React.Component<MenuProps, MenuState> {
    public state = {
        currentw: 0,
        currenth: 0,
        height: 0,
        width: 0,
        toggle: 0,
    }

    public onPreAnimate(time: number, advance: number) {
        // asd
        // if (this.__div) {
        //     const height = this.__div.scrollHeight;
        //     const width = this.__div.scrollWidth;
        //     if (this.state.width !== width || this.state.height !== height) {
        //         this.setState({ height, width });
        //     }
        // }
    }

    public onAnimate(time: number, advance: number) {
        const currentw = Math.round(this.state.currentw + ((this.props.open ? this.state.width : 0) - this.state.currentw) * (advance / 100));
        const currenth = Math.round(this.state.currenth + ((this.props.open ? this.state.height : 0) - this.state.currenth) * (advance / 100));
        if (currentw !== this.state.currentw || currenth !== this.state.currenth) {
          console.log(currentw, currenth);
            this.setState({ currentw, currenth });
        }
    }

    public render() {
        const { onClick, disabled, children } = this.props;
        const { accent } = this.props;
        const css = cx('component', { open });
        const accented = accent;
        return (
            <Material
                className={css}
                onClick={onClick}
                menu
                slim
                divRef={this._height}
                style={{ maxWidth: this.state.currentw, maxHeight: this.state.currenth, opacity: this.state.currentw > 3 ? 1 : 0 }}>
                <Content>
                  {children}
                </Content>
            </Material>
        );
    }

    protected componentDidMount() {
        GetRoot(this).add(this);
    }

    protected componentWillUnmount() {
        GetRoot(this).remove(this);
    }

    private __div: HTMLDivElement;

    private _height = (d: HTMLDivElement) => {
        this.__div = d;
        if (this.__div) {
            const height = this.__div.scrollHeight;
            const width = this.__div.scrollWidth;
            if (this.state.width !== width || this.state.height !== height) {
                this.setState({ height, width });
            }
        }
    }
}
