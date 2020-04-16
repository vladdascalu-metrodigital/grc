import React, { Component } from 'react';
import { lookup } from '../Util/translations';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import './index.scss';

export default class InboxFilterPanel extends Component {
    cookie = new Cookies();
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="inbox-filter">
                <div className="mrc-radio-button">
                    <label className="m-radioButton" htmlFor={'store-initiated-requests'}>
                        <input
                            type="radio"
                            className="m-radioButton-input"
                            id={'store-initiated-requests'}
                            name="inbox-filter"
                            defaultChecked={this.props.chosenFilter === 'store-initiated-requests'}
                            onChange={() => this.execOnChange('store-initiated-requests')}
                        />
                        <div className="m-radioButton-radioIcon m-radioButton-inputIcon" />
                        <span className="m-radioButton-label">
                            <p>{lookup('mrc.inbox.OwnStoreInitiatedRequests')} </p>
                        </span>
                    </label>
                </div>
                <div className="mrc-radio-button">
                    <label className="m-radioButton" htmlFor={'my-initiated-requests'}>
                        <input
                            type="radio"
                            className="m-radioButton-input"
                            id={'my-initiated-requests'}
                            name="inbox-filter"
                            defaultChecked={this.props.chosenFilter === 'my-initiated-requests'}
                            onChange={() => this.execOnChange('my-initiated-requests')}
                        />
                        <div className="m-radioButton-radioIcon m-radioButton-inputIcon" />
                        <span className="m-radioButton-label">
                            <p>{lookup('mrc.inbox.MyInitiatedRequests')} </p>
                        </span>
                    </label>
                </div>
                <div className="mrc-radio-button">
                    <label className="m-radioButton" htmlFor={'store-customers-requests'}>
                        <input
                            type="radio"
                            className="m-radioButton-input"
                            id={'store-customers-requests'}
                            name="inbox-filter"
                            defaultChecked={this.props.chosenFilter === 'store-customers-requests'}
                            onChange={() => this.execOnChange('store-customers-requests')}
                        />
                        <div className="m-radioButton-radioIcon m-radioButton-inputIcon" />
                        <span className="m-radioButton-label">
                            <p>{lookup('mrc.inbox.StoreCustomersRequests')} </p>
                        </span>
                    </label>
                </div>
            </div>
        );
    }

    execOnChange = (chosenFilter) => {
        if (this.props.chosenFilter !== chosenFilter) {
            this.props.onChange(chosenFilter);
        }
    };
}

InboxFilterPanel.propTypes = {
    chosenFilter: PropTypes.string,
    onChange: PropTypes.func,
};
