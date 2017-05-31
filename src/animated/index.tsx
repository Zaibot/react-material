import PropTypes from 'prop-types';
import React from 'react';
import { GetAnimationRoot, IAnimatable, RootSymbol } from '../animationroot';

export default (<T extends IAnimatable<any> & React.Component<any, any>>(constructor: T, always = false): T => {
    return class extends (constructor as any as { new (): IAnimatable<any> & React.Component<any, any> }) {
        public static contextTypes = { ...(constructor as any).contextTypes, [RootSymbol]: PropTypes.any.isRequired };

        protected componentDidMount() {
            // super.componentDidMount();
            GetAnimationRoot(this).add(this, always);
        }

        protected componentWillUnmount() {
            // super.componentWillUnmount();
            GetAnimationRoot(this).remove(this);
        }
    } as any as T;
}) as ClassDecorator;
