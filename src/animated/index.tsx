import PropTypes from 'prop-types';
import React from 'react';
import { GetAnimationRoot, IAnimatable, RootSymbol } from '../animationroot';
export type Constructor<T> = { new (...args: any[]): T };
export default (always = false) => {
    return function <T extends Constructor<IAnimatable<any> & React.Component<any, any> & React.ComponentLifecycle<any, any>>>(constructor: T) {
        return class extends constructor {
            public static contextTypes = { ...(constructor as React.ComponentClass<any>).contextTypes, [RootSymbol]: PropTypes.any.isRequired };

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

// export default (always = false) => {
//     //
//     return <T extends Constructor<T> & IAnimatable<any> & React.Component<any, any> & React.ComponentClass<any> & React.ComponentLifecycle<any, any>>(constructor: T) => {
//         return class extends Constructor<T> {
//             public static contextTypes = { ...constructor.contextTypes, [RootSymbol]: PropTypes.any.isRequired };
//
//             public componentDidMount() {
//                 super.componentDidMount();
//                 GetAnimationRoot(this as any as T).add(this as any as T, always);
//             }
//
//             public componentWillUnmount() {
//                 super.componentWillUnmount();
//                 GetAnimationRoot(this as any as T).remove(this as any as T);
//             }
//         } as any as T;
//     };
// };
// export default (<T extends IAnimatable<any> & React.Component<any, any>>(constructor: Constructor<T>, always = false): T => {
//     return class extends (constructor as Constructor<IAnimatable<any> & React.Component<any, any> & React.ComponentLifecycle<any, any>>) {
//         public static contextTypes = { ...(constructor as any).contextTypes, [RootSymbol]: PropTypes.any.isRequired };
//
//         public componentDidMount() {
//             super.componentDidMount();
//             GetAnimationRoot(this).add(this, always);
//         }
//
//         public componentWillUnmount() {
//             super.componentWillUnmount();
//             GetAnimationRoot(this).remove(this);
//         }
//     } as any as T;
// }) as ClassDecorator;
