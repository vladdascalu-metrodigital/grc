import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { Table } from '../../../Table';
import { lookup } from '../../../Util/translations';
import * as _ from 'lodash';
import DefinitionList from '../../../DefinitionList';
import Bullet, { MODE as BM } from '../../../Bullet';

export default class Strategy extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    statusToIcon(value) {
        switch (value) {
            case 'OK':
                return BM.SUCCESS;
            case 'SEMI_OK':
                return BM.WARNING;
            case 'NOT_OK':
                return BM.ERROR;
            default:
                return 'unknown';
        }
    }

    strategy = (strategyKeyIndicatorsData, approvalProcess, countryCode) => {
        let selectedCreditProgramKey = 'strategy.programs.general-customer';
        selectedCreditProgramKey = _.isNil(approvalProcess.selectedCreditProgram)
            ? selectedCreditProgramKey
            : approvalProcess.selectedCreditProgram;
        selectedCreditProgramKey = _.isNil(approvalProcess.request.selectedCreditProgram)
            ? selectedCreditProgramKey
            : approvalProcess.request.selectedCreditProgram;

        const renderIndicatorName = indicatorName => {
            const prefix =
                !_.isNil(approvalProcess.decisiveIndicators) &&
                approvalProcess.decisiveIndicators.includes(indicatorName)
                    ? '*'
                    : '';
            return prefix + lookup(indicatorName);
        };

        const makeExplanation = (status, indicator) => {
            const shouldRender = !(indicator.original.status === 'OK' || indicator.original.status === 'NA');
            return shouldRender ? lookup(indicator.original.indicatorName + '.' + indicator.original.status) : null;
        };

        const makeValue = (value, indicator) => {
            const limitDescriptors = [
                'strategy.keyindicators.internalRecommendedLimit',
                'strategy.keyindicators.requestedGroupLimit',
                'strategy.keyindicators.externalScore.boniversum.recommendedLimit',
                'strategy.keyindicators.externalScore.ceg.recommendedLimit',
                'strategy.keyindicators.externalScore.coface.recommendedLimit',
                'strategy.keyindicators.externalScore.crefo.recommendedLimit',
                'strategy.keyindicators.externalScore.schufa.recommendedLimit',
                'strategy.keyindicators.externalScore.schufa_b2b.recommendedLimit',
                'strategy.keyindicators.externalScore.schufa_b2c.recommendedLimit',
            ];
            if (isNaN(value)) {
                return lookup(value);
            } else if (limitDescriptors.includes(indicator.original.indicatorName)) {
                return <mrc-number show-currency-for-country={countryCode}>{value}</mrc-number>;
            } else {
                return <mrc-number>{value}</mrc-number>;
            }
        };

        const columns = [
            { Header: lookup('strategy.data.indicator'), accessor: 'indicatorName', renderFn: renderIndicatorName },
            {
                Header: lookup('strategy.data.value'),
                accessor: 'value',
                renderFn: makeValue,
            },
            {
                Header: lookup('strategy.data.rating'),
                accessor: 'status',
                renderFn: status => {
                    return (
                        <span className="cell-score">
                            <Bullet mode={this.statusToIcon(status)} />
                        </span>
                    );
                },
            },
            {
                Header: lookup('strategy.data.explanation'),
                renderFn: makeExplanation,
            },
        ];

        const indicators = _.get(strategyKeyIndicatorsData, 'keyIndicators.indicators');

        if (!indicators) {
            return null;
        }

        if (!_.isObject(indicators) && !_.isArray(indicators)) {
            return null;
        }

        const indicatorsSequence = Object.keys(indicators).reduce((acc, key) => {
            const indicator = indicators[key];
            acc.push({ indicatorName: key, value: indicator[0], status: indicator[1] });
            return acc;
        }, []);
        const automaticDecision = approvalProcess.automaticDecisionAt != null && (
            <DefinitionList
                title={lookup('strategy.data.decision')}
                list={[
                    {
                        term: 'historyDetails.approvalProcess.automaticDecisionAt',
                        description: <mrc-datetime>{approvalProcess.automaticDecisionAt}</mrc-datetime>,
                    },
                ]}
            />
        );

        return (
            <div className="mrc-details">
                {automaticDecision}
                <h3 className="span-metro-blue">{lookup(selectedCreditProgramKey)}</h3>
                <Table className="mrc-data-table" columns={columns} data={indicatorsSequence} />
            </div>
        );
    };

    render() {
        if (!this.props.strategyKeyIndicatorsData) {
            return <div className="mrc-detail">{lookup('strategy.data.none-available')}</div>;
        }
        return (
            <div className="mrc-strategy-data">
                {this.strategy(
                    this.props.strategyKeyIndicatorsData,
                    this.props.approvalProcess,
                    this.props.countryCode
                )}
            </div>
        );
    }
}

Strategy.propTypes = {
    strategyKeyIndicatorsData: PropTypes.object,
    approvalProcess: PropTypes.object,
    countryCode: PropTypes.string,
};
