import React, { Component } from 'react';
import { lookup } from '../../Util/translations';
import Recommendations from '../../Recommendations';
import ColoredBox from '../../Layout/ColoredBox';
import Layout, { LAYOUT_TYPES } from '../../Layout';
import Text from '../../TextBox/Text';
import TextBox from '../../TextBox';
import MrcNumber from '../../MrcNumber';
import { Accordion, Collapsible } from '../../Accordion';
import { Table } from '../../Table';
import '../Table/index.scss';
import { PropTypes } from 'prop-types';
import * as _ from 'lodash';
import moment from 'moment';
import { getMccScoreTranslation, getMccScoreColor } from '../../Util/topManagementHelper';

import './index.scss';

const selectOrEmpty = (obj, field) => (_.get(obj, field) ? _.get(obj, field) : '-');

const joinOrNull = (x, y, z) => (!_.isNil(x) && !_.isNil(z) && !_.isNil(y) ? x + y + z : null);

const yearDiffFromNow = (d) => {
    var diff = moment(Date.now()).diff(new Date(d), 'years');
    return diff === 0 ? '<1' : diff.toString();
};

const groupLimit = (items, accessor) => {
    return _.sum(_.map(items, (item) => _.get(item, accessor + '.amount')));
};

export default class Management extends Component {
    withDeviceClass(cs) {
        return (this.props.mobile ? 'mobile' : 'desktop') + ' ' + cs;
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    customerLimits(approvalItems, country) {
        const withGroupLimit = approvalItems.concat([
            {
                customer: { firstName: lookup('mrc.approvedGroupLimit'), lastName: '' },
                approvedCreditData: {
                    amount: this.props.approvedGroupLimit,
                },
            },
        ]);
        const fmtCreditLimit = (x) => {
            const amount = _.get(x, 'amount');
            return amount ? (
                <MrcNumber isCurrency country={country}>
                    {amount}
                </MrcNumber>
            ) : (
                '-'
            );
        };
        const columns = [
            {
                Header: 'customer',
                accessor: 'customer',
                renderFn: (x) => x.firstName + ' ' + x.lastName,
            },
            {
                Header: 'applied',
                accessor: 'approvedCreditData',
                renderFn: fmtCreditLimit,
            },
            {
                Header: 'current',
                accessor: 'currentCreditData',
                renderFn: fmtCreditLimit,
            },
            {
                Header: 'requested',
                accessor: 'requestedCreditData',
                renderFn: fmtCreditLimit,
            },
            {
                Header: 'expiry',
                accessor: 'requestedLimitExpiry',
                renderFn: (x) => selectOrEmpty(x, 'limitExpiryDate'),
            },
        ];
        return <Table className="mrc-data-table" title={'Customer Limits'} columns={columns} data={withGroupLimit} />;
    }

    groupLimitBox(headerKey, groupLimit, currency, headerSize, contentSize, headerColor, contentColor) {
        if (!groupLimit) {
            return null;
        }
        return (
            <TextBox
                header={
                    <Text color={headerColor} size={headerSize} uppercase>
                        {lookup(headerKey)}
                    </Text>
                }
                suffix={currency}
            >
                <Text color={contentColor} size={contentSize}>
                    <MrcNumber>{groupLimit}</MrcNumber>
                </Text>
            </TextBox>
        );
    }

    groupLimitBoxes(approvalItems, currency) {
        const groupLimits = [
            groupLimit(approvalItems, 'currentCreditData'),
            this.props.requestedGroupLimit,
            this.props.approvedGroupLimit,
        ];
        const keys = ['mrc.creditdetails.current', 'mrc.creditdetails.requested', 'mrc.creditdetails.applied'];
        const keyColors = ['light_grey', 'light_grey', 'white'];
        const valueColors = ['dark_grey', 'blue', 'white'];
        const boxColors = ['light_grey', 'dark_grey', 'green'];

        const max = _.max(groupLimits);

        const xs = groupLimits
            .map((x) => Math.round((x / max) * 10))
            .map((size, i) => {
                return {
                    limit: groupLimits[i],
                    key: keys[i],
                    keyColor: keyColors[i],
                    valueColor: valueColors[i],
                    size: size.toString(),
                    boxColor: boxColors[i],
                };
            });
        return xs.map((x, i) => (
            <div key={i}>
                <ColoredBox color={x.boxColor} size={x.size}>
                    {this.groupLimitBox(x.key, x.limit, currency, null, x.size.toString(), x.keyColor, x.valueColor)}
                </ColoredBox>
            </div>
        ));
    }

    recommendations(data) {
        return (
            <Recommendations
                recommendations={data.map((x) => {
                    return {
                        id: x.id,
                        content: x.content,
                        rating: x.rating,
                        uploaderName: x.uploaderPrincipalName,
                        uploaderPosition: x.uploaderPosition,
                        uploadTime: x.uploadTimestamp,
                        canEdit: x.uploaderPrincipalName === this.props.currentUser && x.persisted === false,
                    };
                })}
                onDelete={this.props.deleteRecommendation}
                onSave={this.props.upsertRecommendation}
                canAddNew={true}
                addNewDisabled={this.props.buttonsDisabled}
            />
        );
    }

    render() {
        const { approvalItems, totalTurnover, currency, profitability } = this.props;
        const requestedCustomer = _.find(approvalItems, (item) => _.get(item, 'customer.requestedCustomer'));
        const customerData = requestedCustomer && requestedCustomer.customer;
        if (!customerData) {
            return (
                <div className="mrc-details">
                    <p>{lookup('history.errors.loading')}</p>
                </div>
            );
        }
        return (
            <div className="mrc-management-page">
                <Layout type={LAYOUT_TYPES.COL_2_TABLET}>
                    <TextBox
                        footer={
                            <Text color="light_grey">
                                {joinOrNull(customerData.segment, ' - ', customerData.legalForm)}
                            </Text>
                        }
                        suffix={joinOrNull(customerData.storeNumber, '/', customerData.customerNumber)}
                    >
                        <Text size={'5'}>{joinOrNull(customerData.firstName, ' ', customerData.lastName)}</Text>
                    </TextBox>
                    <Layout type={LAYOUT_TYPES.COL_2}>
                        <TextBox
                            header={lookup('mrc.customerdetails.fields.registration')}
                            suffix={lookup('mrc.customerdetails.label.years')}
                        >
                            <Text size={'10'}>{yearDiffFromNow(customerData.registrationDate)}</Text>
                        </TextBox>
                        <TextBox
                            header={lookup('mrc.customerdetails.fields.founded')}
                            suffix={lookup('mrc.customerdetails.label.years')}
                        >
                            <Text size={'10'}>{yearDiffFromNow(customerData.companyFoundationDate)}</Text>
                        </TextBox>
                    </Layout>
                </Layout>
                <hr></hr>
                <TextBox>
                    <Text color="blue">{lookup('mrc.groupLimit')}</Text>
                </TextBox>
                <Layout type={LAYOUT_TYPES.COL_2_TABLET}>
                    <section>{this.groupLimitBoxes(approvalItems, currency)}</section>
                    <section>
                        <Layout type={LAYOUT_TYPES.COL_2}>
                            <TextBox
                                header={lookup('mrc.mdw.totalturnover')}
                                footer={totalTurnover ? lookup('mrc.topmanagement.l12m') : null}
                                suffix={totalTurnover ? currency : null}
                            >
                                <Text size={'5'}>{totalTurnover ? <MrcNumber>{totalTurnover}</MrcNumber> : 'N/A'}</Text>
                            </TextBox>
                            <TextBox header={lookup('mrc.topmanagement.bond')} footer={null} suffix={null}>
                                <Text size={'5'}>N/A</Text>
                            </TextBox>
                        </Layout>
                        <Layout type={LAYOUT_TYPES.COL_2}>
                            <TextBox header={lookup('mrc.topmanagement.solvency')}>
                                <Text color={getMccScoreColor(this.props.validMccScore)} size={'5'}>
                                    {getMccScoreTranslation(this.props.validMccScore)}
                                </Text>
                            </TextBox>
                            <TextBox header={lookup('mrc.topmanagement.profitability')} suffix={null}>
                                <Text color="green" size={'5'}>
                                    {profitability && profitability !== null
                                        ? Number(profitability).toFixed(2) + '%'
                                        : 'N/A'}
                                </Text>
                            </TextBox>
                        </Layout>
                    </section>
                </Layout>
                <Accordion>
                    <Collapsible trigger={lookup('mrc.topmanagement.showdetails')}>
                        {this.customerLimits(approvalItems, customerData.country)}
                    </Collapsible>
                </Accordion>
                <section>{this.recommendations(this.props.recommendations)}</section>
            </div>
        );
    }
}

Management.propTypes = {
    approvalItems: PropTypes.array,
    buttonsDisabled: PropTypes.bool,
    totalTurnover: PropTypes.number,
    profitability: PropTypes.number,
    deleteRecommendation: PropTypes.func,
    recommendations: PropTypes.array,
    upsertRecommendation: PropTypes.func,
    recommendation: PropTypes.object,
    mobile: PropTypes.bool,
    currentUser: PropTypes.string,
    currency: PropTypes.string,
    validMccScore: PropTypes.object,
    approvedGroupLimit: PropTypes.number,
    requestedGroupLimit: PropTypes.number,
};
