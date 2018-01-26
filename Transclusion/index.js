import React, {Component} from 'react';

export default class Transclusion extends Component {

    constructor(props) {
        super(props);
        this.state = {iFrameHeight: '0px'};
    }

    componentDidMount() {
        this.iFrame.addEventListener('load', () => this.adjustIFrameHeight());
    }

    adjustIFrameHeight() {
        const iFrameDocument = this.iFrame.contentWindow.document;
        const successIndicator = 'data-fragment-loaded'; // the iframe is only visible if the loaded body element contains this string
        if (iFrameDocument && iFrameDocument.body && iFrameDocument.body.outerHTML && iFrameDocument.body.outerHTML.includes(successIndicator)) {
            this.setState({iFrameHeight: iFrameDocument.body.scrollHeight + 'px'});
        } else {
            this.setState({iFrameHeight: '0px'});
        }
    }

    render() {
        return (
            <iFrame ref={iFrame => this.iFrame = iFrame}
                    width='100%'
                    height={this.state.iFrameHeight}
                    scrolling='no'
                    frameBorder='0'
                    {...this.props} />
        );
    }
}
