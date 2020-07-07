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
        const _new = (parent, obj, path) =>
            parent === 'history' ? _.get(obj, 'limit.current.' + path) : _.get(obj, 'limit.new.' + path);

        const _current = (parent, customer, path) =>
            parent === 'history' ? _.get(customer, 'limit.old.' + path) : _.get(customer, 'limit.current.' + path);

        const {
            isCashCustomer,
            requestsCash,
            parent,
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
        const blockingInfo = customer.blockingInfo;
        const isBlocked = _.isNil(blockingInfo) ? false : blockingInfo.isBlocked;
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
                                    exhausted={null}
                                    limit={_current(parent, customer, 'amount')}
                                    isBlue
                                />
                            </Table.D>

                            <Table.D rowSpan="2">
                                <CRTableCellExpiry
                                    expiryLimit={_current(parent, customer, 'expiry.amount')}
                                    expiryDate={_current(parent, customer, 'expiry.date')}
                                    isBlue
                                />
                            </Table.D>

                            <Table.D rowSpan="2" borderFix>
                                <CRTableCellCreditProduct
                                    productName={lookup(_current(parent, customer, 'product'))}
                                    productTimePeriod={[
                                        _current(parent, customer, 'period'),
                                        _current(parent, customer, 'period') ? ts.days : '-',
                                    ].join(' ')}
                                    productPaymentMethod={_current(parent, customer, 'debittype')}
                                    isBlue
                                />
                            </Table.D>
                        </React.Fragment>
                    )}

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
                            productTimePeriod={[_.get(customer, 'limit.wish.period'), ts.days].join(' ')}
                            productPaymentMethod={_.get(customer, 'limit.wish.method')}
                        />
                    </Table.D>
                    <Table.D rowSpan="2">
                        <ToggleIndicator />
                    </Table.D>
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
                    {requestsCash ? (
                        <Table.D colSpan="3" rowSpan="2">
                            <CRTableCellPrepaymentCash name={ts.cash} isBlue />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    exhausted={null}
                                    limit={_new(parent, customer, 'amount')}
                                    isGreen
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.wish.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.wish.expiry.date')}
                                    isGreen
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={_new(parent, customer, 'product')}
                                    productTimePeriod={[_new(parent, customer, 'period'), ts.days].join(' ')}
                                    productPaymentMethod={_new(parent, customer, 'method')}
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
