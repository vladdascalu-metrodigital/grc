import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { lookup } from '../../Util/translations';
import DunningEmailTable from '../../MrcUiTable/DunningEmailTable';
import { getErrorCode } from '../util/util';
import _ from 'lodash';
import MrcSpinner from '../../Util/MrcSpinner';

export class DunningEmailManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: this.props.customers,
            showRowEditModal: null,
            showMultiRowEditModal: null,
            changedCustomers: {},
            isCleanAllTableStatus: null,
        };
    }

    componentDidUpdate(prevState) {
        if (this.state != prevState && this.state.isCleanAllTableStatus) {
            this.setState({ isCleanAllTableStatus: null });
        }
    }

    cleanAllTableStatus = () => {
        this.setState({ isCleanAllTableStatus: true, changedCustomers: {} });
    };

    updateShowRowEditModal = (customer) => {
        this.props.hideDunningEmailChangeNotification();
        this.setState({ showRowEditModal: customer });
    };

    updateShowMultiRowEditModal = (show) => {
        this.props.hideDunningEmailChangeNotification();
        this.setState({ showMultiRowEditModal: show });
    };

    handleCustomerDunningEmailSave = (dunningEmail, accountIds) => {
        return this.props.onDunningEmailSave(this.props.requestedCustomerId, dunningEmail, accountIds).then((data) => {
            const errorCode = getErrorCode(data);
            if (errorCode) {
                // error case no update
                return errorCode;
            } else {
                // update customers
                let changedCs = this.state.changedCustomers;
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
                        changedCs[c.accountId] = newCustomerData;
                        newCustomers.push(newCustomerData);
                    } else {
                        newCustomers.push(c);
                    }
                });
                this.setState({
                    showRowEditModal: null,
                    showMultiRowEditModal: false,
                    customers: newCustomers,
                    changedCustomers: changedCs,
                });
                return null;
            }
        });
    };

    render() {
        const { customers } = this.state;

        if (this.state.isCleanAllTableStatus) {
            return <MrcSpinner />;
        }

        if (this.props.size === 0) {
            return (
                <React.Fragment>
                    <h3>{lookup('mrc.dunningemailmanagement.noActiveCustomer')}</h3>
                </React.Fragment>
            );
        }

        const columnHeaderNames = {
            customerName: lookup('mrc.dunningemailmanagement.table.customerName'),
            customerId: lookup('mrc.dunningemailmanagement.table.customerId'),
            dunningEmailStatus: lookup('mrc.dunningemailmanagement.table.status'),
            dunningEmail: lookup('mrc.dunningemailmanagement.table.dunningEmail'),
        };
        return (
            <React.Fragment>
                <h3>
                    {this.props.size} {lookup('mrc.dunningemailmanagement.customerGroupInfo')} <br></br>
                    {this.props.isRequestedCustomerActive
                        ? null
                        : this.props.requestedCustomerId.storeNumber +
                          '/' +
                          this.props.requestedCustomerId.customerNumber +
                          ' ' +
                          lookup('mrc.dunningemailmanagement.inactiveCustomer')}
                </h3>
                <DunningEmailTable
                    tableData={customers}
                    columnHeaderNames={columnHeaderNames}
                    requestedCustomerId={this.props.requestedCustomerId}
                    handleCustomerDunningEmailSave={this.handleCustomerDunningEmailSave}
                    showRowEditModal={this.state.showRowEditModal}
                    updateShowRowEditModal={this.updateShowRowEditModal}
                    showMultiRowEditModal={this.state.showMultiRowEditModal}
                    updateShowMultiRowEditModal={this.updateShowMultiRowEditModal}
                    allCustomerEmails={this.props.allCustomerEmails}
                    noGroup={this.props.size === 1}
                    cleanAllTableStatus={this.cleanAllTableStatus}
                    changedCustomers={this.state.changedCustomers}
                />
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
    isRequestedCustomerActive: PropTypes.bool,
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
    onDunningEmailSave: PropTypes.func,
    allCustomerEmails: PropTypes.array,
    hideDunningEmailChangeNotification: PropTypes.func,
};

DunningEmailManagement.defaultProps = {
    customers: [],
    size: 0,
};
