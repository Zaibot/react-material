import React from 'react';
import Material from '../material';
import cx from './style.less';
import { Animated } from '../animationroot';

export type SizeCallback = (dimensions: { x: number; y: number; }) => void;
export type ContentProps = {
    onSize?: SizeCallback;
};
export type ContentState = {
};

@Animated
export default class Content extends React.Component<ContentProps, ContentState> {
    public state = {
    };

    public onPreAnimate(time: number, advance: number, state: ClientRect): ClientRect {
        return state;
    }

    public onAnimate(time: number, advance: number, state: ClientRect): ClientRect {
        return state;
    }

    public render() {
      const { children } = this.props;
      return (
        <div className={cx(`component`)}>
          {children}
        </div>
      );
    }
}
