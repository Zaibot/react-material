import React from 'react';
import Material from '../material';
import cx from './style.less';

export type SizeCallback = (dimensions: { x: number; y: number; }) => void;
export type ContentProps = {
    onSize?: SizeCallback;
};
export type ContentState = {
};

export default class Content extends React.Component<ContentProps, ContentState> {
    public state = {
    };

    public render() {
      const { children } = this.props;
      return (
        <div className={cx(`component`)}>
          {children}
        </div>
      );
    }
}
