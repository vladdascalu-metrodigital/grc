import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { lookup } from '../../Util/translations';
import MrcSpinner from '../../Util/MrcSpinner';
import ErrorHandler from '../../ErrorHandler';
import { DunningEmailManagement } from './DunningEmailManagement';
import { connect } from 'react-redux';
import { fetchCustomerInGroup, onDunningEmailSave, hideDunningEmailChangeNotification } from './service';
import * as _ from 'lodash';
import { displayCustomerId, displayCustomerName } from '../util/util';

export class DunningEmailManagementLayout extends Component {
    constructor(props) {
        super(props);
        this.props.currentUiPageTitleEvent(lookup('mrc.apps.dunningemailmanagement'));
    }

    render() {
        if (!this.props.config || !this.props.data || !this.props.data.data) {
            return <MrcSpinner />;
        }

        const customersInGroupData = this.props.data.data;
        const dunningEmailCustomers = customersInGroupData.customers;
        if (customersInGroupData.size === 0) {
            return (
                <div className="dunning-email-management">
                    <ErrorHandler>
                        <DunningEmailManagement data={[]} size={customersInGroupData.size} />
                    </ErrorHandler>
                </div>
            );
        }
        let allCustomerEmails = [];
        dunningEmailCustomers.map((customer) => {
            if (!_.isEmpty(customer.dunningEmail) && !allCustomerEmails.includes(customer.dunningEmail)) {
                allCustomerEmails.push(customer.dunningEmail.toLowerCase().trim());
            }
            if (!_.isEmpty(customer.customerEmails)) {
                customer.customerEmails.map((email) => {
                    if (!allCustomerEmails.includes(email)) {
                        allCustomerEmails.push(email.toLowerCase().trim());
                    }
                });
            }
        });
        if (!_.isEmpty(allCustomerEmails)) {
            allCustomerEmails.sort(function (a, b) {
                return a.length - b.length || a.localeCompare(b);
            });
        }
        return (
            <div className="dunning-email-management">
                <ErrorHandler>
                    <DunningEmailManagement
                        requestedCustomerId={customersInGroupData.customerBasicInfo.customerId}
                        isRequestedCustomerActive={customersInGroupData.customerBasicInfo.active}
                        customers={dunningEmailCustomers.map((customer) => {
                            return {
                                customerName: displayCustomerName(customer),
                                customerId: displayCustomerId(customer),
                                dunningEmail: _.isEmpty(customer.dunningEmail)
                                    ? null
                                    : customer.dunningEmail.toLowerCase().trim(),
                                dunningEmailStatus: customer.emailVerificationStatus
                                    ? customer.emailVerificationStatus
                                    : 'NO_DUNNING_EMAIL',
                                accountId: customer.accountId,
                                customerEmails: customer.customerEmails,
                            };
                        })}
                        size={customersInGroupData.size}
                        onDunningEmailSave={this.props.onDunningEmailSave}
                        allCustomerEmails={allCustomerEmails}
                        hideDunningEmailChangeNotification={this.props.hideDunningEmailChangeNotification}
                    />
                </ErrorHandler>
            </div>
        );
    }
}

DunningEmailManagementLayout.propTypes = {
    data: PropTypes.object,
    config: PropTypes.object,
    currentUiPageTitleEvent: PropTypes.func,
    onDunningEmailSave: PropTypes.func,
    fetchCustomerInGroup: PropTypes.func,
    hideDunningEmailChangeNotification: PropTypes.func,
};

export default connect(null, function (dispatch) {
    return {
        onDunningEmailSave: (customerId, dunningEmail, accountIds) =>
            onDunningEmailSave(dispatch, customerId, dunningEmail, accountIds),
        fetchCustomerInGroup: (country, storeNumber, customerNumber) =>
            fetchCustomerInGroup(dispatch, country, storeNumber, customerNumber),
        hideDunningEmailChangeNotification: () => hideDunningEmailChangeNotification(dispatch),
    };
})(DunningEmailManagementLayout);
