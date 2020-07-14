import React, { Component } from 'react';
import * as _ from 'lodash';
import Table from '../../MrcTable';
import ExpandedRow from './ExpandedRow';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import CRTableCellPrepaymentCash from './CRTableCellPrepaymentCash';
import ToggleIndicator from '../../ToggleIndicator';
import { lookup } from '../../Util/translations';

export default class CreditTableRowHistory extends Component {
    render() {
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

        const isCashCustomer = customer.isCashCustomer;
        const ts = translations;
        const blockingInfo = customer.blockingInfo;
        const isBlocked = _.isNil(blockingInfo) ? false : blockingInfo.isBlocked;

        const isNoChangeInWish =
            _.isNil(_.get(customer, 'limit.wish.amount')) && _.isNil(_.get(customer, 'limit.wish.product'));

        const isNoChangeInCurrent =
            _.isNil(_.get(customer, 'limit.current.amount')) && _.isNil(_.get(customer, 'limit.current.product'));

        return (
            <React.Fragment>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={rowType}
                    style={{
                        cursor: canToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={canToggle ? () => onExpand() : null}
                    onMouseEnter={canToggle ? () => onHover(true) : null}
                    onMouseLeave={canToggle ? () => onHover(false) : null}
                >
                    <Table.D rowSpan="2">
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
                        <Table.D colSpan="3" rowSpan="2">
                            <CRTableCellPrepaymentCash name={ts.cash} isBlue />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D rowSpan="2">
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={_.get(customer, 'limitExhaustion')}
                                    limit={_.get(customer, 'limit.old.amount')}
                                    isBlue
                                />
                            </Table.D>

                            <Table.D rowSpan="2">
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.old.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.old.expiry.date')}
                                    isBlue
                                />
                            </Table.D>

                            <Table.D rowSpan="2" borderFix>
                                <CRTableCellCreditProduct
                                    productName={lookup(_.get(customer, 'limit.old.product'))}
                                    productTimePeriod={[
                                        _.get(customer, 'limit.old.period'),
                                        _.get(customer, 'limit.old.period') ? ts.days : '-',
                                    ].join(' ')}
                                    productPaymentMethod={_.get(customer, 'limit.old.debitType')}
                                    isBlue
                                />
                            </Table.D>
                        </React.Fragment>
                    )}

                    {isNoChangeInWish ? (
                        <Table.D colSpan="3">
                            <CRTableCellPrepaymentCash name={ts.nochange} isBlue />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={null}
                                    limit={_.get(customer, 'limit.wish.amount')}
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.wish.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.wish.expiry.date')}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={_.get(customer, 'limit.wish.product')}
                                    productTimePeriod={[
                                        lookup(_.get(customer, 'limit.wish.period')),
                                        _.get(customer, 'limit.wish.period') ? ts.days : '-',
                                    ].join(' ')}
                                    productPaymentMethod={_.get(customer, 'limit.wish.debitType')}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}

                    <Table.D rowSpan="2">{canToggle ? <ToggleIndicator /> : null}</Table.D>
                </Table.R>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={rowType}
                    style={{
                        cursor: canToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={canToggle ? () => onExpand() : null}
                    onMouseEnter={canToggle ? () => onHover(true) : null}
                    onMouseLeave={canToggle ? () => onHover(false) : null}
                >
                    {isNoChangeInCurrent ? (
                        <Table.D colSpan="3" borderFix>
                            <CRTableCellPrepaymentCash name={ts.nochange} isGreen />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={null}
                                    limit={_.get(customer, 'limit.current.amount')}
                                    isGreen
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.current.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.current.expiry.date')}
                                    isGreen
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={_.get(customer, 'limit.current.product')}
                                    productTimePeriod={[_.get(customer, 'limit.current.period'), ts.days].join(' ')}
                                    productPaymentMethod={_.get(customer, 'limit.current.debitType')}
                                    isGreen
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }
}
