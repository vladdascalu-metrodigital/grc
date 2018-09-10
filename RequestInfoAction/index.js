import React, {Component} from 'react';
import MrcSpinner from '../Util/MrcSpinner';
import './index.scss';
import {lookup} from '../Util/translations';

export default class RequestInfoAction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step:this.props && this.props.steps && this.props.steps[0]
        };
    }

    render() {
        if (this.props.showSpinner) {
            return <MrcSpinner/>;
        }
        return (
            <div className='mrc-send-back'>
                <select onChange={this.updateState}>
                    {this.mapStepsToOptions(this.props.steps)}
                </select>
                <button onClick={this.requestInfo} disabled={this.props.disabled}>
                    {lookup('approval.action.requestinfo')}
                </button>
            </div>
        );
    }

    updateState = (event) => {
        this.setState({step:event.target.value});
    }

    requestInfo = () => {
        this.props.requestInfo(this.state.step);
    }

    mapStepsToOptions = (steps) => {
        return steps.map(step => <option key={step} value={step}>{step}</option>);
    }
}
