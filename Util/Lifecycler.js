import React from 'react';
import PropTypes from 'prop-types';

//
// some constants for property names
//
export const LifecyclerKey          = 'lifecycler';
export const onWillMountKey         = 'onWillMount';
export const onDidMountKey          = 'onDidMount';
export const onWillReceivePropsKey  = 'onWillReceiveProps';
export const onWillUnmountKey       = 'onWillUnmount';
export const onWillUpdateKey        = 'onWillUpdate';
export const onDidUpdateKey         = 'onDidUpdate';

export default function Lifecyler(WrappedComponent) {

    class LifecyclerClass extends React.Component {

        UNSAFE_componentWillMount() {
            const {[onWillMountKey]: onWillMount} = this.props[LifecyclerKey];
            onWillMount && onWillMount();
        }

        componentDidMount() {
            const {[onDidMountKey]: onDidMount} = this.props[LifecyclerKey];
            onDidMount && onDidMount();
        }

        UNSAFE_componentWillReceiveProps(nextProps) {
            const {[onWillReceivePropsKey]: onWillReceiveProps} = this.props[LifecyclerKey];
            onWillReceiveProps && onWillReceiveProps(nextProps);
        }

        componentWillUnmount() {
            const {[onWillUnmountKey]: onWillUnmount} = this.props[LifecyclerKey];
            onWillUnmount && onWillUnmount();
        }

        UNSAFE_componentWillUpdate() {
            const {[onWillUpdateKey]: onWillUpdate} = this.props[LifecyclerKey];
            onWillUpdate && onWillUpdate();
        }

        componentDidUpdate() {
            const {[onDidUpdateKey]: onDidUpdate} = this.props[LifecyclerKey];
            onDidUpdate && onDidUpdate();
        }

        render() {
            // pass everything but the lifecycler structure
            const { [LifecyclerKey]: lifecycler, ...pass } = this.props;   // eslint-disable-line no-unused-vars
            return <WrappedComponent {...pass} />;
        }
    }

  LifecyclerClass.defaultProps = { [LifecyclerKey]: {
    [onWillMountKey]:        null,
    [onDidMountKey]:         null,
    [onWillReceivePropsKey]: null,
    [onWillUnmountKey]:      null,
    [onWillUpdateKey]:       null,
    [onDidUpdateKey]:        null
  } };

  LifecyclerClass.propTypes = {
    [LifecyclerKey]: PropTypes.shape({
      [onWillMountKey]:        PropTypes.func,
      [onDidMountKey]:         PropTypes.func,
      [onWillReceivePropsKey]: PropTypes.func,
      [onWillUnmountKey]:      PropTypes.func,
      [onWillUpdateKey]:       PropTypes.func,
      [onDidUpdateKey]:        PropTypes.func
    })
  };

  return LifecyclerClass;
}
