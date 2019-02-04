
import React, { createContext, PureComponent } from 'react';

const { Consumer, Provider } = createContext();

const withProfile = (Enhanceable) => {
    return class WithProfile extends PureComponent {
        render () {
            return (
                <Consumer>
                    {(context) => (
                        <Enhanceable
                            { ...context }
                            { ...this.props }
                        />
                    )}
                </Consumer>
            );
        }
    };
};

export {
    Consumer,
    Provider,
    withProfile,
};
