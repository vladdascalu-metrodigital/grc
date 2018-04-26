import React, {Component} from 'react';
import './index.scss';
import ReactCollapsible from 'react-collapsible';
import ArrowRight from '../icons/arrow-right-12.svg';
import classNames from "classnames";

export class Accordion extends Component {

    render() {
        const {className, ...anyprops} = this.props;
        return <div className={className + ' mrc-accordion'} {...anyprops}></div>;
    }
}

export class Collapsible extends Component {

    render() {
        const trigger = (
            <span className={classNames(this.props.className, 'trigger-content')}>
                <h1>{this.props.trigger}</h1>
                <img src={ArrowRight}/>
            </span>);
        return <ReactCollapsible transitionTime={200} {...this.props} trigger={trigger}/>;
    }
}
