import React from 'react';

export default class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, showStacktrace: false };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            ...this.state,
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.error) {
            return (
                <div className="mrc-detail">
                    <h2>Something went wrong.</h2>
                    {/*<details style={{whiteSpace: 'pre-wrap'}}>*/}
                    {/*    {this.state.error.stack}*/}
                    {/*</details>*/}
                </div>
            );
        }
        return this.props.children;
    }
}
