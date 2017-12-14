import React, {Component} from 'react';
import './index.scss';
import ReactCollapsible from 'react-collapsible';
import ArrowRight from '../icons/arrow-right-12.svg';

export class Accordion extends Component {

    render() {
        return <div className='mrc-accordion' {...this.props}/>;
    }
}

export class Collapsible extends Component {

    render() {
        const trigger = (
            <span className='trigger-content'>
                <h1>{this.props.trigger}</h1>
                <img src={ArrowRight}/>
            </span>);
        return <ReactCollapsible transitionTime={200} {...this.props} trigger={trigger}/>;
    }
}
