import React, { Component } from 'react';
import { lookup } from '../Util/translations';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import './index.scss';
import ChevronDownIcon from '../icons/chevron-down.svg';

export default class InboxFilterPanel extends Component {
    cookie = new Cookies();
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                filterName: this.props.getChosenFilter(),
            },
        };
    }

    renderFirstLevelFilter = () => {
        return (
            <div className="inbox-filter">
                <div className="mrc-radio-button">
                    <label className="m-radioButton" htmlFor={'store-initiated-requests'}>
                        <input
                            type="radio"
                            className="m-radioButton-input"
                            id={'store-initiated-requests'}
                            name="inbox-filter"
                            defaultChecked={this.state.filter.filterName === 'store-initiated-requests'}
                            onChange={() => this.execOnChange({ filterName: 'store-initiated-requests' })}
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
                            defaultChecked={this.state.filter.filterName === 'my-initiated-requests'}
                            onChange={() => this.execOnChange({ filterName: 'my-initiated-requests' })}
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
                            defaultChecked={this.state.filter.filterName === 'store-customers-requests'}
                            onChange={() => this.execOnChange({ filterName: 'store-customers-requests' })}
                        />
                        <div className="m-radioButton-radioIcon m-radioButton-inputIcon" />
                        <span className="m-radioButton-label">
                            <p>{lookup('mrc.inbox.StoreCustomersRequests')} </p>
                        </span>
                    </label>
                </div>
            </div>
        );
    };

    renderSecondLevelFilter = () => {
        if (this.state.filter.filterName !== 'store-customers-requests') {
            return null;
        }
        return (
            <div className="inbox-filter-raw">
                <div className="inbox-filter-item">
                    <label>{lookup('inbox.filter.assignedUser')}</label>
                    <select
                        id="filter-assignedUser"
                        className="m-input-element"
                        onChange={e => this.execOnChange({ assignedUser: e.target.value })}
                        onBlur={() => {
                            return;
                        }}
                        value={this.state.filter.assignedUser}
                    >
                        <option value=""></option>
                        {this.props.availableFilterOptions.assignedUserNames
                            .filter(option => option !== undefined && option !== null && option.trim().length > 0)
                            .map(option => {
                                return (
                                    <option value={option} key={option}>
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                    <img htmlFor="filter-assignedUser" className="mrc-icon-small mrc-down-icon" src={ChevronDownIcon} />
                </div>
                <div className="inbox-filter-item">
                    <label>{lookup('inbox.filter.assignedPosition')}</label>
                    <select
                        id="filter-assignedPosition"
                        className="m-input-element"
                        onChange={e => this.execOnChange({ selectedPosition: e.target.value })}
                        onBlur={() => {
                            return;
                        }}
                        value={this.state.filter.selectedPosition}
                    >
                        <option value=""></option>
                        {this.props.availableFilterOptions.positions
                            .filter(option => option !== undefined && option !== null && option.trim().length > 0)
                            .map(option => {
                                return (
                                    <option value={option} key={option}>
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                    <img
                        htmlFor="filter-assignedPosition"
                        className="mrc-icon-small mrc-down-icon"
                        src={ChevronDownIcon}
                    />
                </div>
                <div> </div>
                <div> </div>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.renderFirstLevelFilter()}
                {this.renderSecondLevelFilter()}
            </div>
        );
    }

    execOnChange = newFilter => {
        const filter = { ...this.state.filter, ...newFilter };

        if (filter.filterName !== 'store-customers-requests') {
            filter.assignedUser = undefined;
            filter.selectedPosition = undefined;
        }
        if (
            this.state.filter.filterName !== filter.filterName ||
            this.state.filter.assignedUser !== filter.assignedUser ||
            this.state.filter.selectedPosition !== filter.selectedPosition
        ) {
            this.setState({
                filter: filter,
            });
            this.props.setChosenFilter(filter.filterName);
            this.props.onChange(filter);
        }
    };
}

InboxFilterPanel.propTypes = {
    onChange: PropTypes.func,
    getChosenFilter: PropTypes.func,
    setChosenFilter: PropTypes.func,
    availableFilterOptions: PropTypes.shape({
        assignedUserNames: PropTypes.arrayOf(PropTypes.string),
        positions: PropTypes.arrayOf(PropTypes.string),
    }),
};
