import React from 'react';
import Animated from '../animated';
import Material from '../material';
import cx from './style.less';

export type SizeCallback = (dimensions: { x: number; y: number; }) => void;
export interface ContentProps {
    onSize?: SizeCallback;
}
export interface ContentState {
}

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
