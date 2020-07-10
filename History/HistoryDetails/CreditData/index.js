import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Accordion, Collapsible } from '../../../Accordion';

import './index.css';
import DefinitionList from '../../../DefinitionList';
import { lookup } from '../../../Util/translations';
import CustomerTrigger from '../../../CustomerTrigger/presentation';
import CreditDataOfCustomer from './CreditDataOfCustomer';
import CreditDataOfCustomerLimitExpiry from './CreditDataOfCustomerLimitExpiry';
import { evalAddCountryInKeyForWarning } from '../../Shared/WarningUtils';
import { RequestFieldPropTypes } from '../../../AdditionalFields/AdditionalFieldsPropTypes';
import { filterAdditionalFieldsList } from '../../../AdditionalFields/additionalFielsUtil';
import AdditionalFieldsSection from '../../../AdditionalFields/AdditionalFieldsSection';
import CustomerGroupLimits from '../../../CustomerGroupLimits';
import MrcNumber from '../../../MrcNumber';

export default class CreditData extends Component {
    groupLimit(countryCode, current, requested, applied, limitExhaustion) {
        const list = [
            {
                term: 'mrc.label.availablegrouplimit',
                description: <MrcNumber show-currency-for-country={countryCode}>{current - limitExhaustion}</MrcNumber>,
            },
            {
                term: 'mrc.label.exhaustiongrouplimit',
                description: <MrcNumber show-currency-for-country={countryCode}>{limitExhaustion}</MrcNumber>,
            },
            {
                term: 'mrc.label.currentgrouplimit',
                description: <MrcNumber show-currency-for-country={countryCode}>{current}</MrcNumber>,
            },
            {
                term: 'mrc.label.requestedgrouplimit',
                description: <MrcNumber show-currency-for-country={countryCode}>{requested}</MrcNumber>,
            },
            {
                term: 'mrc.label.approvedgrouplimit',
                description: <MrcNumber show-currency-for-country={countryCode}>{applied}</MrcNumber>,
            },
        ];

        return <DefinitionList className={'mrc-customer-group'} title={'mrc.label.customergroup'} list={list} />;
    }

    render() {
        if (!this.props.requestData || !this.props.requestedStatus) {
            return null;
        }

        const requestType =
            !this.props.requestedStatus.requestType || this.props.requestedStatus.requestType !== null
                ? this.props.requestedStatus.requestType
                : undefined;

        if (!requestType || this.props.requestedStatus.requestType === 'QUICK_CHECK') {
            return (
                <section className="mrc-customer-group">
                    <div className="mrc-detail">{lookup('mrc.comment.nocreditdetails')}</div>
                </section>
            );
        }

        const collapsibles = this.props.requestData.map((request, i) => {
            const key = request.customerData.storeNumber + '/' + request.customerData.customerNumber;
            const isWithWarning =
                request.customerData.blockingReason !== null || request.customerData.checkoutCheckCode !== null;
            const current = request.current;
            const requested = request.requested;
            const applied = request.applied;
            request.customerData.requestedCustomer = String(
                request.customerData.accordionDisplayName !== null ? request.customerData.accordionDisplayName : ''
            ).startsWith('*')
                ? true
                : false;
            const additionalFieldsList = filterAdditionalFieldsList(
                this.props.additionalFields !== undefined && this.props.additionalFields !== null
                    ? this.props.additionalFields.requestFields
                    : undefined,
                'CUSTOMER',
                'CREDIT_DATA',
                request.customerData.country,
                request.customerData.storeNumber,
                request.customerData.customerNumber
            );
            const hasAdditionalFields =
                additionalFieldsList !== undefined && additionalFieldsList !== null && additionalFieldsList.length > 0
                    ? true
                    : false;
            const creditDataClass = hasAdditionalFields ? 'span-1-2' : 'span-1-3';

            const trigger = (
                <CustomerTrigger
                    customer={request.customerData}
                    current={current.creditLimit}
                    requested={requested.creditLimit}
                    approved={applied.creditLimit}
                    isWithWarning={isWithWarning}
                />
            );

            return (
                <Collapsible open={i === 0} key={key} trigger={trigger}>
                    <div className="mrc-ui-col-3">
                        <div className={creditDataClass}>
                            <div className="mrc-details">
                                {requestType !== 'LIMIT_EXPIRY' ? (
                                    <CreditDataOfCustomer
                                        countryCode={this.props.countryCode}
                                        current={current}
                                        requested={requested}
                                        applied={applied}
                                        limitExpiryDate={request.limitExpiryDate}
                                        resetToLimitAmount={request.resetToLimitAmount}
                                        checkoutCheckCode={request.customerData.checkoutCheckCode}
                                        blockingReason={request.customerData.blockingReason}
                                        addCountryInKeyForWarning={evalAddCountryInKeyForWarning(
                                            this.props.countriesWithDifferentBlockingCodes,
                                            this.props.countryCode
                                        )}
                                    />
                                ) : (
                                    <CreditDataOfCustomerLimitExpiry
                                        countryCode={this.props.countryCode}
                                        creationDate={this.props.requestedStatus.creationDate}
                                        appliedCreditProduct={this.props.requestedStatus.creditProduct}
                                        appliedCreditPeriod={this.props.requestedStatus.creditPeriod}
                                        appliedDebitType={this.props.requestedStatus.debitType}
                                        amountBeforeExpiry={this.props.requestedStatus.amountBeforeExpiry}
                                        amount={this.props.requestedStatus.amount}
                                        status={this.props.requestedStatus.status}
                                    />
                                )}
                            </div>
                        </div>
                        {hasAdditionalFields ? (
                            <div className="mrc-credit-data mrc-input-group">
                                <AdditionalFieldsSection
                                    requestFields={additionalFieldsList}
                                    onChange={() => {
                                        return;
                                    }}
                                    onBlur={() => {
                                        return;
                                    }}
                                    disabled={true}
                                />
                            </div>
                        ) : null}
                    </div>
                </Collapsible>
            );
        });

        const shouldRenderGroupLimit = requestType !== 'LIMIT_EXPIRY' && this.props.requestData.length > 1;

        /*eslint-disable */
        const groupLimit = shouldRenderGroupLimit ? (
            <div>
                <CustomerGroupLimits
                    country={this.props.countryCode}
                    exhaustionGroupLimit={this.props.groupLimit.limitExhaustion}
                    requestedGroupLimit={this.props.groupLimit.requested}
                    approvedGroupLimitInst={this.props.groupLimit.applied}
                    currentGroupLimit={this.props.groupLimit.current}
                    availableGroupLimit={this.props.groupLimit.current - this.props.groupLimit.limitExhaustion}
                />
            </div>
        ) : null;
        /*eslint-enable */
        const requestAdditionalFields = filterAdditionalFieldsList(
            this.props.additionalFields !== undefined && this.props.additionalFields !== null
                ? this.props.additionalFields.requestFields
                : undefined,
            'REQUEST',
            'CREDIT_DATA'
        );
        const hasRequestAdditionalFields =
            requestAdditionalFields !== undefined &&
            requestAdditionalFields !== null &&
            requestAdditionalFields.length > 0
                ? true
                : false;
        const groupAdditionalFields = filterAdditionalFieldsList(
            this.props.additionalFields !== undefined && this.props.additionalFields !== null
                ? this.props.additionalFields.requestFields
                : undefined,
            'GROUP',
            'CREDIT_DATA'
        );
        const hasGroupAdditionalFields =
            groupAdditionalFields !== undefined && groupAdditionalFields !== null && groupAdditionalFields.length > 0
                ? true
                : false;
        const groupAndAdditionalFieldsClass =
            'small-margin-bottom ' + (shouldRenderGroupLimit ? 'mrc-ui-col-3' : 'mrc-ui-col-2');
        return (
            <div>
                <div className={groupAndAdditionalFieldsClass}>
                    {groupLimit}
                    {hasRequestAdditionalFields ? (
                        <div className="mrc-credit-data mrc-input-group">
                            <span
                                className="additional-fields-background-text"
                                title={lookup('additional.fields.request.title')}
                            ></span>
                            <AdditionalFieldsSection
                                requestFields={requestAdditionalFields}
                                onChange={() => {
                                    return;
                                }}
                                onBlur={() => {
                                    return;
                                }}
                                disabled={true}
                            />
                        </div>
                    ) : null}
                    {hasGroupAdditionalFields ? (
                        <div className="mrc-credit-data mrc-input-group">
                            <span
                                className="additional-fields-background-text"
                                title={lookup('additional.fields.group.title')}
                            ></span>
                            <AdditionalFieldsSection
                                requestFields={groupAdditionalFields}
                                onChange={() => {
                                    return;
                                }}
                                onBlur={() => {
                                    return;
                                }}
                                disabled={true}
                            />
                        </div>
                    ) : null}
                </div>
                <Accordion> {collapsibles} </Accordion>
            </div>
        );
    }
}

CreditData.propTypes = {
    requestedStatus: PropTypes.object,
    requestData: PropTypes.array,
    countryCode: PropTypes.string,
    groupLimit: PropTypes.object,
    additionalFields: PropTypes.shape({ requestFields: PropTypes.arrayOf(RequestFieldPropTypes) }),
    countriesWithDifferentBlockingCodes: PropTypes.array,
};
