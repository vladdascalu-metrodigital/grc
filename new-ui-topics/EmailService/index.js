import React, { Component } from 'react';

import Search from '../../Search';
import Checkbox from '../../Checkbox';
import Button, { COLOR as BUTTONCOLOR, SIZE as BUTTONSIZE } from '../../Button';
import PropTypes from 'prop-types';

import { SimpleActionDock } from '../../ActionDock';
import Pill from '../../Pill';

import { stickyOffsetFromCombined } from '../../Util/stickyUtil';

import _ from 'lodash';

import SingleEMailEditModalDialog from './SingleEMailEditModalDialog';
import MultipleEMailEditModalDialog from './MultipleEMailEditModalDialog';

import './index.scss';
import './MrcUiBasicGridTable.scss';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

export default class EmailService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectAll: false,
            selectedCustomers: {},
            showRowEditModal: null,
            showMultiRowEditModal: null,
        };
    }

    refreshStickyOffset() {
        stickyOffsetFromCombined({
            offsetSelector: '.mrc-ui-basic-grid-table thead tr:first-child th, .mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-basic-grid-table thead tr:last-child th')).forEach(
                    (e) => {
                        e.style.setProperty('--sticky-top', offset + 'px');
                    }
                ),
        });
        stickyOffsetFromCombined({
            offsetSelector: '.mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-basic-grid-table thead tr:first-child th')).forEach(
                    (e) => {
                        e.style.setProperty('--sticky-top', offset + 'px');
                    }
                ),
        });
    }

    componentDidMount() {
        this.refreshStickyOffset();
        window.addEventListener('resize', _.debounce(this.refreshStickyOffset, 150));
    }

    handleCustomerSelect(arrayId) {
        this.setState({
            selectAll: false,
            selectedCustomers: {
                ...this.state.selectedCustomers,
                [arrayId]: !this.state.selectedCustomers[arrayId],
            },
        });
    }

    handleCustomerSelectAll(data) {
        let selectedCustomers = {};

        if (!this.state.selectAll) {
            data.forEach((v, k) => {
                selectedCustomers[k] = !this.state.selectAll;
            });
        }

        this.setState({
            selectAll: !this.state.selectAll,
            selectedCustomers: {
                ...selectedCustomers,
            },
        });
    }

    render() {
        let { data } = this.props;
        let { showRowEditModal, showMultiRowEditModal, selectedCustomers } = this.state;
        return (
            <React.Fragment>
                <table className="mrc-ui-basic-grid-table mrc-ui-email-service-table">
                    <thead>
                        <tr>
                            <th>
                                <h2>Customer Group</h2>
                                <div className="mrc-ui-form-box">
                                    <div className="mrc-ui-form-box-search-wrapper">
                                        <Search placeholder="Search by Id, Name..." />
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Checkbox
                                    checked={this.state.selectAll}
                                    onChange={() => this.handleCustomerSelectAll(data)}
                                />
                            </th>
                            <th>
                                Customer{' '}
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th>
                                Status
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th>
                                Dunning Email
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th>
                                Action
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, k) => {
                            let type = 'success';
                            if (d.dunningEmailStatus != 'approved') {
                                type = 'danger';
                            }
                            return (
                                <tr key={k}>
                                    <td>
                                        <Checkbox
                                            checked={this.state.selectedCustomers[k]}
                                            onChange={() => this.handleCustomerSelect(k)}
                                        />
                                    </td>
                                    <td className="mrc-ui-basic-table-grid-customer-cell">
                                        <span>{d.customer}</span>&nbsp;<span>{d.customerId}</span>
                                    </td>
                                    <td>
                                        <Pill text={d.dunningEmailStatus} type={type} withIcon />
                                    </td>
                                    <td className="mrc-ui-basic-table-grid-dunning-email-cell">{d.dunningEmail}</td>
                                    <td>
                                        <Button
                                            size={BUTTONSIZE.SMALL}
                                            text="Edit"
                                            isOutlined
                                            color={BUTTONCOLOR.PRIMARY}
                                            onClick={() => this.setState({ showRowEditModal: d })}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {showRowEditModal && (
                    <SingleEMailEditModalDialog
                        customer={showRowEditModal}
                        onCancel={() => this.setState({ showRowEditModal: null })}
                        onOk={() => this.setState({ showRowEditModal: null })}
                    />
                )}

                {showMultiRowEditModal && (
                    <MultipleEMailEditModalDialog
                        customers={data}
                        selectedCustomers={selectedCustomers}
                        onCancel={() => this.setState({ showMultiRowEditModal: false })}
                        onOk={() => this.setState({ showMultiRowEditModal: false })}
                    />
                )}

                <SimpleActionDock
                    cancelText="Cancel"
                    applyText="Edit Selection"
                    applyDisabled={!Object.values(this.state.selectedCustomers).includes(true)}
                    cancelDisabled={!Object.values(this.state.selectedCustomers).includes(true)}
                    onApply={() => this.setState({ showMultiRowEditModal: true })}
                    onCancel={() =>
                        this.setState({
                            selectAll: false,
                            selectedCustomers: {},
                        })
                    }
                />
            </React.Fragment>
        );
    }
}

EmailService.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            customer: PropTypes.string,
            customerId: PropTypes.string,
            dunningEmail: PropTypes.string,
            dunningEmailStatus: PropTypes.string,
        })
    ),
};

EmailService.defaultProps = {
    data: [],
};
