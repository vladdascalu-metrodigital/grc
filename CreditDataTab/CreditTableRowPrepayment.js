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

export default class CreditTableRowPrepayment extends Component {
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
        } = this.props;
        const ts = translations;

        const creditOption = _.get(customer, 'limit.creditOption');

        const isCashCustomer = customer.isCashCustomer;
        const isPrepaymentCustomer = customer.isPrepaymentCustomer;
        const blockingInfo = customer.blockingInfo;
        const isBlocked = _.isNil(blockingInfo) ? false : blockingInfo.isBlocked;
        const refinedCanToggle = canToggle && !isPrepaymentCustomer;

        const isNoChange = creditOption === 'NONE';

        return (
            <React.Fragment>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={rowType}
                    style={{
                        cursor: refinedCanToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={refinedCanToggle ? () => onExpand() : null}
                    onMouseEnter={refinedCanToggle ? () => onHover(true) : null}
                    onMouseLeave={refinedCanToggle ? () => onHover(false) : null}
                >
                    <Table.D>
                        {customer ? (
                            <CRTableCellCustomer
                                name={customer.name}
                                number={[customer.storeNumber, customer.number].join('/')}
                                isBlocked={isBlocked}
                                blockingText={ts.blocked}
                                isHighlighted
                            />
                        ) : null}
                    </Table.D>
                    {isCashCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.cash} color={'blue'} />
                        </Table.D>
                    ) : isPrepaymentCustomer ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.prepayment} color={'blue'} />
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
                    {isNoChange ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.nochange} color={'green'} />
                        </Table.D>
                    ) : (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.prepayment} color={'green'} />
                        </Table.D>
                    )}
                    <Table.D>{refinedCanToggle ? <ToggleIndicator /> : null}</Table.D>
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }
}
