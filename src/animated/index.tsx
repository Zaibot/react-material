import PropTypes from 'prop-types';
import React from 'react';
import { GetAnimationRoot, RootSymbol } from '../animationroot';
import IAnimatable from '../animationroot/animatable';

const getDisplayName = (component: any) => (
  component.displayName ||
  component.name ||
  (typeof component === 'string' ? component : 'Component')
);

export interface Constructor<T> { new (...args: any[]): T; }
export default (always = false) => {
    // tslint:disable-next-line only-arrow-functions
    return function <T extends Constructor<IAnimatable<any> & React.Component<any, any> & React.ComponentLifecycle<any, any>>>(constructor: T) {
        return class Me extends constructor {
            public static contextTypes = { ...(constructor as React.ComponentClass<any>).contextTypes, [RootSymbol]: PropTypes.any.isRequired };

            private static _displayName = `Animatable > ${getDisplayName(constructor)}`;

            public get displayName() {
              return Me._displayName;
            }

            public componentDidMount() {
                if (super.componentDidMount) {
                    super.componentDidMount();
                }
                GetAnimationRoot(this).add(this, always);
            }

            public componentWillUnmount() {
                if (super.componentWillUnmount) {
                    super.componentWillUnmount();
                }
                GetAnimationRoot(this).remove(this);
            }
        } as any as T;
    };
};
