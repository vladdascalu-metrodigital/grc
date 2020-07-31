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

export default class CreditTableRowHistory extends Component {
    render() {
        const { historyRequestType } = this.props;

        const isLimitExpiry = historyRequestType === 'LIMIT_EXPIRY';
        const isCreditCorrection = historyRequestType === 'CREDIT_CORRECTION';
        return isLimitExpiry
            ? this.createLimitExpiryCreditDataRow()
            : isCreditCorrection
            ? this.createCreditCorrectionCreditDataRow()
            : this.createCreditDataRow();
    }

    createCreditDataRow() {
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

        const isCreditDataInRed = customer.failedActivation === true;
        const blockingOption = _.get(customer, 'limit.current.blockingOption');
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
                            <CRTableCellBiggerText text={ts.cash} color={'blue'} />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D rowSpan="2">
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={true}
                                    exhausted={_.get(customer, 'limitExhaustion')}
                                    limit={_.get(customer, 'limit.old.amount')}
                                    color={'blue'}
                                />
                            </Table.D>

                            <Table.D rowSpan="2">
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.old.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.old.expiry.date')}
                                    color={'blue'}
                                />
                            </Table.D>

                            <Table.D rowSpan="2" borderFix>
                                <CRTableCellCreditProduct
                                    productName={lookup(_.get(customer, 'limit.old.product'))}
                                    productTimePeriod={createProductTimePeriod(
                                        _.get(customer, 'limit.old.period'),
                                        _.get(customer, 'limit.old.period')
                                            ? lookup(_.get(customer, 'limit.old.period'))
                                            : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={_.get(customer, 'limit.old.debitType')}
                                    color={'blue'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}

                    {isNoChangeInWish ? (
                        <Table.D colSpan="3">
                            <CRTableCellBiggerText text={ts.nochange} color={'blue'} />
                        </Table.D>
                    ) : !_.isNil(blockingOption) ? (
                        <Table.D colSpan="3" borderFix>
                            <CRTableCellBiggerText
                                text={lookup(('mrc.blocking-option.' + blockingOption).toLowerCase())}
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
                                    productTimePeriod={createProductTimePeriod(
                                        _.get(customer, 'limit.wish.period'),
                                        _.get(customer, 'limit.wish.period')
                                            ? lookup(_.get(customer, 'limit.wish.period'))
                                            : null,
                                        ts.days
                                    )}
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
                            <CRTableCellBiggerText text={ts.nochange} color={'blue'} />
                        </Table.D>
                    ) : !_.isNil(blockingOption) ? (
                        <Table.D colSpan="3" borderFix>
                            <CRTableCellBiggerText
                                text={lookup(('mrc.blocking-option.' + blockingOption).toLowerCase())}
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
                                    limit={_.get(customer, 'limit.current.amount')}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.current.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.current.expiry.date')}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={_.get(customer, 'limit.current.product')}
                                    productTimePeriod={createProductTimePeriod(
                                        _.get(customer, 'limit.current.period'),
                                        _.get(customer, 'limit.current.period')
                                            ? lookup(_.get(customer, 'limit.current.period'))
                                            : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={_.get(customer, 'limit.current.debitType')}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }

    createLimitExpiryCreditDataRow() {
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
        const isNoChangeInCurrent =
            _.isNil(_.get(customer, 'limit.current.amount')) && _.isNil(_.get(customer, 'limit.current.product'));
        const isCreditDataInRed = customer.failedActivation === true;
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
                                    showExhausted={false}
                                    exhausted={null}
                                    limit={_.get(customer, 'limit.old.amount')}
                                    color={'blue'}
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.old.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.old.expiry.date')}
                                    color={'blue'}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={lookup(_.get(customer, 'limit.old.product'))}
                                    productTimePeriod={createProductTimePeriod(
                                        _.get(customer, 'limit.old.period'),
                                        _.get(customer, 'limit.old.period')
                                            ? lookup(_.get(customer, 'limit.old.period'))
                                            : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={_.get(customer, 'limit.old.debitType')}
                                    color={'blue'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    {isNoChangeInCurrent ? (
                        <Table.D colSpan="3" borderFix>
                            <CRTableCellBiggerText text={ts.nochange} color={'green'} />
                        </Table.D>
                    ) : (
                        <React.Fragment>
                            <Table.D>
                                <CRTableCellLimit
                                    country={country}
                                    showExhausted={false}
                                    exhausted={null}
                                    limit={_.get(customer, 'limit.current.amount')}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.current.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.current.expiry.date')}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={_.get(customer, 'limit.current.product')}
                                    productTimePeriod={createProductTimePeriod(
                                        _.get(customer, 'limit.current.period'),
                                        _.get(customer, 'limit.current.period')
                                            ? lookup(_.get(customer, 'limit.current.period'))
                                            : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={_.get(customer, 'limit.current.debitType')}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    <Table.D>{canToggle ? <ToggleIndicator /> : null}</Table.D>
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }

    createCreditCorrectionCreditDataRow() {
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
        const isNoChangeInCurrent =
            _.isNil(_.get(customer, 'limit.current.amount')) && _.isNil(_.get(customer, 'limit.current.product'));
        const isCreditDataInRed = customer.failedActivation === true;
        const blockingOption = _.get(customer, 'limit.current.blockingOption');
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
                                    limit={_.get(customer, 'limit.old.amount')}
                                    color={'blue'}
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.old.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.old.expiry.date')}
                                    color={'blue'}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={lookup(_.get(customer, 'limit.old.product'))}
                                    productTimePeriod={createProductTimePeriod(
                                        _.get(customer, 'limit.old.period'),
                                        _.get(customer, 'limit.old.period')
                                            ? lookup(_.get(customer, 'limit.old.period'))
                                            : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={lookup(_.get(customer, 'limit.old.debitType'))}
                                    color={'blue'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    {isNoChangeInCurrent ? (
                        <Table.D colSpan="3" borderFix>
                            <CRTableCellBiggerText text={ts.nochange} color={'blue'} />
                        </Table.D>
                    ) : !_.isNil(blockingOption) ? (
                        <Table.D colSpan="3" borderFix>
                            <CRTableCellBiggerText
                                text={lookup(('mrc.blocking-option.' + blockingOption).toLowerCase())}
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
                                    limit={_.get(customer, 'limit.current.amount')}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>

                            <Table.D>
                                <CRTableCellExpiry
                                    expiryLimit={_.get(customer, 'limit.current.expiry.amount')}
                                    expiryDate={_.get(customer, 'limit.current.expiry.date')}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>

                            <Table.D borderFix>
                                <CRTableCellCreditProduct
                                    productName={lookup(_.get(customer, 'limit.current.product'))}
                                    productTimePeriod={createProductTimePeriod(
                                        _.get(customer, 'limit.current.period'),
                                        _.get(customer, 'limit.current.period')
                                            ? lookup(_.get(customer, 'limit.current.period'))
                                            : null,
                                        ts.days
                                    )}
                                    productPaymentMethod={lookup(_.get(customer, 'limit.current.debitType'))}
                                    color={isCreditDataInRed ? 'red' : 'green'}
                                />
                            </Table.D>
                        </React.Fragment>
                    )}
                    <Table.D>{canToggle ? <ToggleIndicator /> : null}</Table.D>
                </Table.R>
                {isExpanded ? <ExpandedRow {...this.props} /> : null}
            </React.Fragment>
        );
    }
}
