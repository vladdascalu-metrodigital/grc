import React, { Component } from 'react';
import Table from '../../MrcTable';
import ExpandedRow from './ExpandedRow';
import CRTableCellCustomer from './CRTableCellCustomer';
import CRTableCellLimit from './CRTableCellLimit';
import CRTableCellExpiry from './CRTableCellExpiry';
import CRTableCellCreditProduct from './CRTableCellCreditProduct';
import ToggleIndicator from '../../ToggleIndicator';
import { lookup } from '../../Util/translations';

import * as _ from 'lodash';

const translations = {
    blocked: lookup('mrc.status.blocked'),
    customerWish: lookup('mrc.credittab.customerWish'),
    current: lookup('mrc.creditdata.current'),
    old: lookup('mrc.credittab.old'),
    new: lookup('mrc.credittab.new'),
    days: lookup('mrc.credittab.days'),
    choosepayment: lookup('mrc.credittab.choosepayment'),
    prepayment: lookup('mrc.payment.Prepayment'),
    cash: lookup('mrc.credittab.cash'),
    payment: lookup('mrc.credittab.payment'),
    paymentdescription: lookup('mrc.credittab.paymentdescription'),
    credit: lookup('mrc.creditdata.title'),
    limit: lookup('mrc.credittab.limit'),
    limitdescription: lookup('mrc.credittab.limitdescription'),
    chooseamount: lookup('mrc.credittab.chooseamount'),
};

export default class CreditTableRowA extends Component {
    render() {
        const oldOrCurrent = (historical, obj, path) =>
            historical ? _.get(obj, 'limit.old.' + path) : _.get(obj, 'limit.current.' + path);
        const currentOrNew = (historical, obj, path) =>
            historical ? _.get(obj, 'limit.current.' + path) : _.get(obj, 'limit.new.' + path);
        const {
            customer,
            isExpanded,
            country,
            isHovered,
            id,
            canToggle,
            type,
            historical,
            onExpand,
            onHover,
        } = this.props;
        return (
            <React.Fragment>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={type}
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
                                isBlocked={customer.isBlocked}
                                isHighlighted
                            />
                        ) : null}
                    </Table.D>

                    <Table.D rowSpan="2">
                        <CRTableCellLimit
                            country={country}
                            exhausted={null}
                            limit={oldOrCurrent(historical, customer, 'amount')}
                            isBlue
                        />
                    </Table.D>

                    <Table.D rowSpan="2">
                        <CRTableCellExpiry
                            expiryLimit={oldOrCurrent(historical, customer, 'expiry.amount')}
                            expiryDate={oldOrCurrent(historical, customer, 'expiry.date')}
                            isBlue
                        />
                    </Table.D>

                    <Table.D rowSpan="2" borderFix>
                        <CRTableCellCreditProduct
                            productName={oldOrCurrent(historical, customer, 'product')}
                            productTimePeriod={[
                                oldOrCurrent(historical, customer, 'period'),
                                oldOrCurrent(historical, customer, 'period') ? translations.days : '-',
                            ].join(' ')}
                            productPaymentMethod={oldOrCurrent(historical, customer, 'method')}
                            isBlue
                        />
                    </Table.D>

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
                            productTimePeriod={[_.get(customer, 'limit.wish.period'), translations.days].join(' ')}
                            productPaymentMethod={_.get(customer, 'limit.wish.method')}
                        />
                    </Table.D>
                    <Table.D rowSpan="2">
                        <ToggleIndicator tilt={isExpanded} />
                    </Table.D>
                </Table.R>
                <Table.R
                    isActive={isExpanded}
                    isHovered={isHovered}
                    sticky={id}
                    stickyOffset={'tr[data-sticky="credit-table-head-sticky"]'}
                    type={type}
                    style={{
                        cursor: canToggle ? 'pointer' : 'auto',
                        '--sticky-override': isExpanded ? 'sticky' : 'static',
                    }}
                    onClick={canToggle ? () => onExpand() : null}
                    onMouseEnter={canToggle ? () => onHover(true) : null}
                    onMouseLeave={canToggle ? () => onHover(false) : null}
                >
                    <Table.D>
                        <CRTableCellLimit
                            country={country}
                            exhausted={null}
                            limit={currentOrNew(historical, customer, 'amount')}
                            isGreen
                        />
                    </Table.D>

                    <Table.D>
                        <CRTableCellExpiry
                            expiryLimit={currentOrNew(historical, customer, 'expiry.amount')}
                            expiryDate={currentOrNew(historical, customer, 'expiry.date')}
                            isGreen
                        />
                    </Table.D>

                    <Table.D borderFix>
                        <CRTableCellCreditProduct
                            productName={currentOrNew(historical, customer, 'product')}
                            productTimePeriod={[currentOrNew(historical, customer, 'period'), translations.days].join(
                                ' '
                            )}
                            productPaymentMethod={currentOrNew(historical, customer, 'method')}
                            isGreen
                        />
                    </Table.D>
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }
}
