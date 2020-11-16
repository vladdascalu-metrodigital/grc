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

import Select from '../../Select';
import { Table } from '../../Table';
import { lookup } from '../../Util/translations';
import { getErrorCode } from '../util/util';

export class DunningEmailManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectAll: false,
            selectedCustomers: {},
            showRowEditModal: null,
            showMultiRowEditModal: null,
            selectedDunningEmailStatusFilter: null,
            customers: this.props.customers,
            query: null,
        };
        this.handleDunningEmailStatusFilterOnChange = this.handleDunningEmailStatusFilterOnChange.bind(this);
    }

    refreshStickyOffset() {
        stickyOffsetFromCombined({
            offsetSelector: '.mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-basic-grid-table-form')).forEach((e) => {
                    e.style.setProperty('--sticky-top', offset + 'px');
                }),
        });

        stickyOffsetFromCombined({
            offsetSelector: ' .mrc-ui-basic-grid-table-form, .mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-basic-grid-table-header th')).forEach((e) => {
                    e.style.setProperty('--sticky-top', offset + 'px');
                }),
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.customers !== prevProps.customers) {
            this.setState({
                customers: this.props.customers,
            });
        }
    }

    componentDidMount() {
        this.refreshStickyOffset();
        window.addEventListener('resize', _.debounce(this.refreshStickyOffset, 150));
    }

    handleCustomerSelect(accountId) {
        this.props.hideDunningEmailChangeNotification();
        this.setState({
            selectAll: false,
            selectedCustomers: {
                ...this.state.selectedCustomers,
                [accountId]: !this.state.selectedCustomers[accountId],
            },
        });
    }

    handleCustomerSelectAll(customers) {
        this.props.hideDunningEmailChangeNotification();
        let selectedCustomers = {};

        if (!this.state.selectAll) {
            customers.forEach((v) => {
                selectedCustomers[v.accountId] = !this.state.selectAll;
            });
        }

        this.setState({
            selectAll: !this.state.selectAll,
            selectedCustomers: {
                ...selectedCustomers,
            },
        });
    }

    cleanUpSelection() {
        this.props.hideDunningEmailChangeNotification();
        const selectedCustomers = {};
        this.setState({
            selectAll: false,
            selectedCustomers: {
                ...selectedCustomers,
            },
        });
    }

    handleSearchOnChange(e) {
        this.cleanUpSelection();
        this.setState({
            query: e,
        });
        this.props.search.onChange(e, this.state.selectedDunningEmailStatusFilter);
    }

    handleDunningEmailStatusFilterOnChange(filter, query) {
        this.cleanUpSelection();
        const selectedFilter = _.isEmpty(filter) ? null : filter;
        this.setState({
            selectedDunningEmailStatusFilter: selectedFilter,
        });
        this.props.search.onChange(query, selectedFilter);
    }

    handleCustomerDunningEmailSave = (dunningEmail, accountIds) => {
        return this.props.onDunningEmailSave(this.props.requestedCustomerId, dunningEmail, accountIds).then((data) => {
            const errorCode = getErrorCode(data);
            if (errorCode) {
                // error case no update
                return errorCode;
            } else {
                // update customers
                let newCustomers = [];
                this.state.customers.forEach((c) => {
                    const changedCustomer = data[c.accountId];
                    if (!_.isEmpty(changedCustomer)) {
                        const newCustomerData = {
                            customerName: c.customerName,
                            customerId: c.customerId,
                            dunningEmail: changedCustomer.dunningEmail,
                            dunningEmailStatus: changedCustomer.emailVerificationStatus,
                            accountId: c.accountId,
                            customerEmails: c.customerEmails,
                        };
                        newCustomers.push(newCustomerData);
                    } else {
                        newCustomers.push(c);
                    }
                });
                this.setState({ showRowEditModal: null, showMultiRowEditModal: false, customers: newCustomers });
                return null;
            }
        });
    };

    createTable(customers) {
        let allColumns = [];
        if (this.props.size > 1) {
            allColumns.push({
                Header: (
                    <Checkbox checked={this.state.selectAll} onChange={() => this.handleCustomerSelectAll(customers)} />
                ),
                accessor: 'accountId',
                renderFn: (accountId) => (
                    <Checkbox
                        checked={this.state.selectedCustomers[accountId]}
                        onChange={() => this.handleCustomerSelect(accountId)}
                    />
                ),
            });
        }

        const columnsWithoutSelection = [
            {
                Header: lookup('mrc.dunningemailmanagement.table.customer'),
                accessor: (customer) => customer,
                renderFn: (customer) => (
                    <div className="mrc-ui-basic-table-grid-cell-customer">
                        <span className="mrc-ui-basic-table-grid-cell-customer-name">{customer.customerName}</span>
                        <span className="mrc-ui-basic-table-grid-cell-customer-id">{customer.customerId}</span>
                    </div>
                ),
            },
            {
                Header: lookup('mrc.dunningemailmanagement.table.status'),
                accessor: 'dunningEmailStatus',
                isSorted: true,
                renderFn: (dunningEmailStatus) => {
                    // TODO: move this into util
                    let type = 'success';
                    if (dunningEmailStatus != 'DOI_VERIFIED') {
                        type = 'danger';
                    }
                    return _.isEmpty(dunningEmailStatus) || dunningEmailStatus === 'NO_DUNNING_EMAIL' ? null : (
                        <Pill
                            text={lookup('mrc.dunningemailmanagement.status.' + dunningEmailStatus)}
                            type={type}
                            withIcon
                        />
                    );
                },
            },
            {
                Header: lookup('mrc.dunningemailmanagement.table.dunningEmail'),
                accessor: 'dunningEmail',
                isSorted: true,
                renderFn: (dunningEmail) => dunningEmail,
            },
            {
                Header: lookup('mrc.dunningemailmanagement.table.action'),
                accessor: (customer) => customer,
                renderFn: (customer) => (
                    <Button
                        size={BUTTONSIZE.SMALL}
                        text={lookup('mrc.dunningemailmanagement.button.edit')}
                        isOutlined
                        color={BUTTONCOLOR.PRIMARY}
                        onClick={() => {
                            this.cleanUpSelection();
                            this.setState({ showRowEditModal: customer });
                        }}
                    />
                ),
            },
        ];
        allColumns.push(...columnsWithoutSelection);
        return (
            <div className="mrc-data-table">
                <Table columns={allColumns} data={customers} className="mrc-data-table" />
            </div>
        );
    }

    getSelectedCustomerAccountIds() {
        let accountIds = [];
        Object.keys(this.state.selectedCustomers).map((id) => {
            if (this.state.selectedCustomers[id]) {
                accountIds.push(id);
            }
        });
        return accountIds;
    }

    render() {
        const { customers } = this.state;
        let { showRowEditModal, showMultiRowEditModal, selectedCustomers } = this.state;
        let options = [['', lookup('mrc.dunningemailmanagement.status.ALL')]];
        if (!_.isEmpty(this.props.filters)) {
            for (let i = 0; i < this.props.filters.length; i++) {
                options.push([
                    this.props.filters[i],
                    lookup('mrc.dunningemailmanagement.status.' + this.props.filters[i]),
                ]);
            }
        }

        if (this.props.size === 0) {
            return (
                <React.Fragment>
                    <h3>{lookup('mrc.dunningemailmanagement.noActiveCustomer')}</h3>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                {this.props.size === 1 ? null : (
                    <div className="mrc-ui-basic-grid-table-form">
                        <h3>
                            {this.props.size} {lookup('mrc.dunningemailmanagement.customerGroupInfo')}
                        </h3>
                        <div className="mrc-ui-form-box">
                            <div className="mrc-ui-form-box-search-wrapper">
                                <Search
                                    placeholder={lookup('mrc.dunningemailmanagement.searchCustomerPlaceHolder')}
                                    clearText={lookup('mrc.dunningemailmanagement.searchClearText')}
                                    onChange={(e) => this.handleSearchOnChange(e)}
                                    onEnterSearch={(e) => this.handleSearchOnChange(e)}
                                />
                            </div>
                            <div>
                                <Select
                                    options={options}
                                    value={this.state.selectedDunningEmailStatusFilter}
                                    onChange={(e) => this.handleDunningEmailStatusFilterOnChange(e, this.state.query)}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="mrc-ui-email-service">{this.createTable(customers)}</div>
                {showRowEditModal && (
                    <SingleEMailEditModalDialog
                        customer={showRowEditModal}
                        onCancel={() => this.setState({ showRowEditModal: null })}
                        onOk={this.handleCustomerDunningEmailSave}
                    />
                )}

                {showMultiRowEditModal && (
                    <MultipleEMailEditModalDialog
                        selectedCustomerAccountIds={this.getSelectedCustomerAccountIds()}
                        customers={customers}
                        onCancel={() => this.setState({ showMultiRowEditModal: false })}
                        onOk={this.handleCustomerDunningEmailSave}
                        allCustomerEmails={this.props.allCustomerEmails}
                    />
                )}

                {this.props.size === 1 ? null : (
                    <SimpleActionDock
                        cancelText={lookup('mrc.dunningemailmanagement.button.cancel')}
                        applyText={lookup('mrc.dunningemailmanagement.button.editSelection')}
                        applyDisabled={!Object.values(selectedCustomers).includes(true)}
                        cancelDisabled={!Object.values(selectedCustomers).includes(true)}
                        onApply={() => {
                            this.props.hideDunningEmailChangeNotification();
                            this.setState({ showMultiRowEditModal: true });
                        }}
                        onCancel={() => {
                            this.props.hideDunningEmailChangeNotification();
                            this.setState({
                                selectAll: false,
                                selectedCustomers: {},
                            });
                        }}
                    />
                )}
            </React.Fragment>
        );
    }
}

DunningEmailManagement.propTypes = {
    requestedCustomerId: PropTypes.shape({
        country: PropTypes.string,
        storeNumber: PropTypes.string,
        customerNumber: PropTypes.string,
    }),
    customers: PropTypes.arrayOf(
        PropTypes.shape({
            customerName: PropTypes.string,
            customerId: PropTypes.string,
            dunningEmail: PropTypes.string,
            dunningEmailStatus: PropTypes.string,
            accountId: PropTypes.string,
            customerEmails: PropTypes.array,
        })
    ),
    size: PropTypes.number,
    search: PropTypes.shape({
        query: PropTypes.string,
        onChange: PropTypes.func,
    }),
    filters: PropTypes.array,
    onDunningEmailSave: PropTypes.func,
    allCustomerEmails: PropTypes.array,
    hideDunningEmailChangeNotification: PropTypes.func,
};

DunningEmailManagement.defaultProps = {
    customers: [],
    size: 0,
};
