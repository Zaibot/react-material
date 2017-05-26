import PropTypes from 'prop-types';
import React from 'react';
import { GetRoot, IAnimatable, RootSymbol } from '../animationroot';

export default (<T extends IAnimatable<any> & React.Component<any, any>>(constructor: T): T => {
    return class extends (constructor as any as { new (): IAnimatable<any> & React.Component<any, any> }) {
        public static contextTypes = { ...(constructor as any).contextTypes, [RootSymbol]: PropTypes.any.isRequired };

        protected componentDidMount() {
            GetRoot(this).add(this);
        }

        protected componentWillUnmount() {
            GetRoot(this).remove(this);
        }
    } as any as T;
}) as ClassDecorator;
