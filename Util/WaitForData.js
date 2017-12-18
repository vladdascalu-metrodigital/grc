import React from 'react';
import MrcSpinner from './MrcSpinner';

/**
 * display a progress bar while createLoadingHelpers utility is loading data
 * @param {*} key 
 */
export default function waitForData(key) {
    return function (WrappedComponent) {
        return class extends React.Component {
            displayName() { return `WaitForData(${WrappedComponent.displayName})`; }

            render() {
                // should the props be used as is or with a subkey?
                const flat  = !key || key === '' || key === '.';
                const p     = flat ? this.props : this.props[key]; 
                
                return (!p || p.error) ? null : (p.loading || !p.data) ? <MrcSpinner/> : <WrappedComponent {...this.props}/>;  
            }
        };
    };
}