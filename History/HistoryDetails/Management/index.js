import React, { Component } from 'react';
import { lookup } from '../../../Util/translations';
import ColoredBox from '../../../Layout/ColoredBox';
// import Recommendation from '../../../Recommendation';
import { getMccScoreTranslation, getMccScoreColor } from '../../../Util/topManagementHelper';
import Recommendations from '../../../Recommendations';
import Layout, { LAYOUT_TYPES } from '../../../Layout';
import Text from '../../../TextBox/Text';
import TextBox from '../../../TextBox';
import { Accordion, Collapsible } from '../../../Accordion';
import { Table } from '../../../Table';
import '../Table/index.scss';
import { PropTypes } from 'prop-types';
import * as _ from 'lodash';
import moment from 'moment';

import './index.scss';

const joinOrNull = (x, y, z) => (!_.isNil(x) && !_.isNil(z) && !_.isNil(y) ? x + y + z : null);

const yearDiffFromNow = (d) => {
    var diff = moment(Date.now()).diff(new Date(d), 'years');
    return diff === 0 ? '<1' : diff.toString();
};

const groupLimit = (items, accessor) => {
    return _.sum(_.map(items, (item) => _.get(item, accessor + '.creditLimit')));
};

const emailAndPosition = (x) => {
    if (!x) {
        return null;
    }
    let [a, b] = x.split('(');
    if (a && b) {
        let [c] = b.split(')');
        return [a, c];
    } else {
        return [null, null];
    }
};

export default class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    customerLimits(requestData, country) {
        const withGroupLimit = requestData.concat([
            {
                customerData: { customerFirstName: lookup('mrc.approvedGroupLimit'), customerLastName: '' },
                applied: {
                    creditLimit: groupLimit(requestData, 'applied'),
                },
            },
        ]);
        const fmtCreditLimit = (x) => {
            const creditLimit = _.get(x, 'creditLimit');
            return creditLimit ? <mrc-number show-currency-for-country={country}>{creditLimit}</mrc-number> : '-';
        };
        const fmtLimitExpiry = (x) => {
            return x ? <mrc-date>{x}</mrc-date> : '-';
        };
        const columns = [
            {
                Header: 'customerData',
                accessor: 'customerData',
                renderFn: (x) => x.customerFirstName + ' ' + x.customerLastName,
            },
            {
                Header: 'applied',
                accessor: 'applied',
                renderFn: fmtCreditLimit,
            },
            {
                Header: 'current',
                accessor: 'current',
                renderFn: fmtCreditLimit,
            },
            {
                Header: 'requested',
                accessor: 'requested',
                renderFn: fmtCreditLimit,
            },
            {
                Header: 'expiry',
                accessor: 'limitExpiryDate',
                renderFn: fmtLimitExpiry,
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
                    <mrc-number>{groupLimit}</mrc-number>
                </Text>
            </TextBox>
        );
    }

    colorBoxes(requestData, currency) {
        const groupLimits = [
            groupLimit(requestData, 'current'),
            groupLimit(requestData, 'requested'),
            groupLimit(requestData, 'applied'),
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
                    size: size,
                    boxColor: boxColors[i],
                };
            });

        return xs.map((x, i) => (
            <div key={i}>
                <ColoredBox color={x.boxColor} size={x.size.toString()}>
                    {this.groupLimitBox(x.key, x.limit, currency, null, x.size.toString(), x.keyColor, x.valueColor)}
                </ColoredBox>
            </div>
        ));
    }

    withDeviceClass(cs) {
        return (this.props.mobile ? 'mobile' : 'desktop') + ' ' + cs;
    }

    recommendations(data) {
        if (!data) {
            return null;
        } else {
            return (
                <Recommendations
                    recommendations={data.map((x) => {
                        const [email, position] = emailAndPosition(x.user);
                        return {
                            content: x.content,
                            rating: x.rating,
                            uploaderName: email,
                            uploaderPosition: position,
                            uploadTime: x.date,
                        };
                    })}
                />
            );
        }
    }

    render() {
        const { requestData, totalTurnover, requestedCustomerId } = this.props;

        let requestedCustomer;
        if (!_.isNil(requestedCustomerId)) {
            const isRequestedCustomer = (item) =>
                !_.isNil(requestedCustomerId) &&
                _.get(item, 'customerData.customerNumber') === requestedCustomerId.customerNumber &&
                _.get(item, 'customerData.storeNumber') === requestedCustomerId.storeNumber;
            requestedCustomer = _.find(requestData, isRequestedCustomer);
        } else {
            // If no requested customer ID is available, just use first
            // customer in group.
            requestedCustomer = requestData && requestData.length > 0 ? requestData[0] : null;
        }
        const customerData = requestedCustomer && requestedCustomer.customerData;

        if (!customerData) {
            return (
                <div className="mrc-details">
                    <p>{lookup('history.errors.loading')}</p>
                </div>
            );
        }
        const currency = {
            DE: 'EUR',
            ES: 'EUR',
            PT: 'EUR',
            AT: 'EUR',
            PK: 'PKR',
            PL: 'PLN',
            RS: 'RSD',
        }[customerData.country];

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
                        <Text size={'5'}>
                            {joinOrNull(customerData.customerFirstName, ' ', customerData.customerLastName)}
                        </Text>
                    </TextBox>
                    <Layout type={LAYOUT_TYPES.COL_2}>
                        <TextBox
                            header={lookup('mrc.topmanagement.registeredsince')}
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
                    <section>{this.colorBoxes(requestData, currency)}</section>

                    <section>
                        <Layout type={LAYOUT_TYPES.COL_2}>
                            <TextBox
                                header={lookup('mrc.mdw.totalturnover')}
                                footer={totalTurnover ? lookup('mrc.topmanagement.l12m') : null}
                                suffix={totalTurnover ? currency : null}
                            >
                                <Text size="5">{totalTurnover ? <mrc-number>{totalTurnover}</mrc-number> : 'N/A'}</Text>
                            </TextBox>
                            <TextBox header={lookup('mrc.topmanagement.bond')} footer={null} suffix={null}>
                                <Text size="5">N/A</Text>
                            </TextBox>
                        </Layout>

                        <Layout type={LAYOUT_TYPES.COL_2}>
                            <TextBox header={lookup('mrc.topmanagement.solvency')}>
                                <Text color={getMccScoreColor(this.props.validMccScore)} size="5">
                                    {getMccScoreTranslation(this.props.validMccScore)}
                                </Text>
                            </TextBox>
                            <TextBox header={lookup('mrc.topmanagement.profitability')} suffix={null}>
                                <Text color="green" size="5">
                                    {this.props.profitability && this.props.profitability !== null
                                        ? Number(this.props.profitability).toFixed(2) + '%'
                                        : 'N/A'}
                                </Text>
                            </TextBox>
                        </Layout>
                    </section>
                </Layout>
                <Accordion>
                    <Collapsible trigger={lookup('mrc.topmanagement.showdetails')}>
                        {this.customerLimits(requestData, this.props.country)}
                    </Collapsible>
                </Accordion>
                <section className="recommendations">{this.recommendations(this.props.recommendations)}</section>
            </div>
        );
    }
}

Management.propTypes = {
    requestData: PropTypes.array,
    totalTurnover: PropTypes.number,
    profitability: PropTypes.number,
    requestedCustomerId: PropTypes.object,
    country: PropTypes.string,
    mobile: PropTypes.bool,
    recommendations: PropTypes.array,
    validMccScore: PropTypes.object,
};
