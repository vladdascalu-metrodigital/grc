import React, { PureComponent } from 'react';
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
    days: lookup('mrc.credittab.days'),
};

export default class CreditTableRowB extends PureComponent {
    render() {
        const oldOrCurrent = (historical, obj, path) =>
            historical ? _.get(obj, 'limit.old.' + path) : _.get(obj, 'limit.current.' + path);
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
                    <Table.D>
                        {customer ? (
                            <CRTableCellCustomer
                                name={customer.name}
                                number={[customer.storeNumber, customer.number].join('/')}
                                isBlocked={customer.isBlocked}
                                isHighlighted
                            />
                        ) : null}
                    </Table.D>
                    <Table.D>
                        <CRTableCellLimit
                            country={country}
                            exhausted={null}
                            limit={oldOrCurrent(historical, customer, 'amount')}
                            isBlue
                        />
                    </Table.D>
                    <Table.D>
                        <CRTableCellExpiry
                            expiryLimit={oldOrCurrent(historical, customer, 'expiry.amount')}
                            expiryDate={oldOrCurrent(historical, customer, 'expiry.date')}
                            isBlue
                        />
                    </Table.D>
                    <Table.D>
                        <CRTableCellCreditProduct
                            productName={lookup(oldOrCurrent(historical, customer, 'product'))}
                            productTimePeriod={[
                                lookup(oldOrCurrent(historical, customer, 'period')),
                                oldOrCurrent(historical, customer, 'period') ? translations.days : '-',
                            ].join(' ')}
                            productPaymentMethod={lookup(oldOrCurrent(historical, customer, 'debittype'))}
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
                    <Table.D>
                        <CRTableCellCreditProduct
                            productName={lookup(_.get(customer, 'limit.wish.product'))}
                            productTimePeriod={[lookup(_.get(customer, 'limit.wish.period')), translations.days].join(
                                ' '
                            )}
                            productPaymentMethod={lookup(_.get(customer, 'limit.wish.debittype'))}
                        />
                    </Table.D>
                    <Table.D>
                        <ToggleIndicator />
                    </Table.D>
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }
}
