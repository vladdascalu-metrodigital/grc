import React, { Component } from 'react';
import * as _ from 'lodash';
import Table from '../MrcTable';
import ExpandedRow from './ExpandedRow';
import CRTableCellCustomer from './CreditTable/CRTableCellCustomer';
import CRTableCellLimit from './CreditTable/CRTableCellLimit';
import CRTableCellExpiry from './CreditTable/CRTableCellExpiry';
import CRTableCellCreditProduct from './CreditTable/CRTableCellCreditProduct';
import CRTableCellBiggerText from './CreditTable/CRTableCellBiggerText';
import ToggleIndicator from '../ToggleIndicator';
import { lookup } from '../Util/translations';
import { createProductTimePeriod } from './creditDataTabUtil';

export default class CreditTableRowCreditCorrection extends Component {
    render() {
        const _current = (customer, path) => _.get(customer, 'limit.current.' + path);
        const {
            customer,
            country,
            id,
            onExpand,
            onHover,
            isExpanded,
            isHovered,
            canToggle,
            rowType,
            translations,
            selectedGroupAction,
        } = this.props;
        const ts = translations;

        const customerCreditOption = _.get(customer, 'limit.creditOption');
        const groupCreditOption = selectedGroupAction;
        const isCashCustomer = customer.isCashCustomer;
        const blockingInfo = customer.blockingInfo;
        const isBlocked = _.isNil(blockingInfo) ? false : blockingInfo.isBlocked;

        const newAmount = _.get(customer, 'limit.new.amount');
        const newProduct = _.get(customer, 'limit.new.product');
        const newPeriod = _.get(customer, 'limit.new.period');
        const newDebitType = _.get(customer, 'limit.new.debitType');

        // in case in de we will fill the customer with remove block option after submit, then we should show the correct status
        const hasRemoveBlockOptionForDE =
            _.get(customer, 'limit.new.blockingOption') === 'REMOVEBLOCK' && country.toLowerCase() === 'de';
        const hasBlockingOption = !_.isNil(_.get(customer, 'limit.new.blockingOption'));
        const isNoChange = this.isCreditCorrectionNoChanged(isCashCustomer, customerCreditOption, groupCreditOption);
        const isValid = _.get(customer, 'limit.valid');
        const isCreditDataInRed = customer.failedActivation === true;
        return (
            <React.Fragment>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={isValid ? rowType : 'invalid'}
                    style={{
                        cursor: canToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={canToggle ? () => onExpand() : null}
                    onMouseEnter={canToggle ? () => onHover(true) : null}
                    onMouseLeave={canToggle ? () => onHover(false) : null}
                >
                    <Table.D>
                        {customer ? (
                            <CRTableCellCustomer
                                name={customer.name}
                                number={[customer.storeNumber, customer.number].join('/')}
                                isBlocked={isBlocked}
                                isHighlighted
                            />
                        ) : null}
                    </Table.D>
                    {isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.cash} color={'blue'} />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={true}
                                    exhausted={_.get(customer, 'limitExhaustion')}
                                    limit={_current(customer, 'amount')}
                                    color={'blue'}
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={_current(customer, 'expiry.amount')}
                                    expiryDate={_current(customer, 'expiry.date')}
                                    color={'blue'}
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellCreditProduct
                                    productName={lookup(_current(customer, 'product'))}
                                    productTimePeriod={createProductTimePeriod(
                                        _current(customer, 'period'),
                                        _current(customer, 'period') ? lookup(_current(customer, 'period')) : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={lookup(_current(customer, 'debitType'))}
                                    color={'blue'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    {hasRemoveBlockOptionForDE ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText
                                text={lookup(
                                    'mrc.blocking-option.' + _.get(customer, 'limit.new.blockingOption').toLowerCase()
                                )}
                                color={isCreditDataInRed ? 'red' : 'green'}
                            />
                        </Table.D>
                    ) : isNoChange ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.nochange} color={'blue'} />
                        </Table.D>
                    ) : hasBlockingOption ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText
                                text={lookup(
                                    'mrc.blocking-option.' + _.get(customer, 'limit.new.blockingOption').toLowerCase()
                                )}
                                color={isCreditDataInRed ? 'red' : 'green'}
                            />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={false}
                                    exhausted={null}
                                    limit={newAmount}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellExpiry
                                    country={country}
                                    expiryLimit={null}
                                    expiryDate={null}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>
                            <Table.D>
                                <CRTableCellCreditProduct
                                    productName={lookup(newProduct)}
                                    productTimePeriod={createProductTimePeriod(
                                        newPeriod,
                                        newPeriod ? lookup(newPeriod) : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={lookup(newDebitType)}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    <Table.D>
                        <ToggleIndicator />
                    </Table.D>
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }

    isCreditCorrectionNoChanged(isCashCustomer, customerCreditOption, groupCreditOption) {
        if (isCashCustomer) {
            return customerCreditOption !== 'NEWCREDIT';
        }

        return groupCreditOption === 'NONE' && customerCreditOption === 'NONE';
    }
}
