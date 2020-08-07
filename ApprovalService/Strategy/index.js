import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lookup } from '../../Util/translations';
import DefinitionList from '../../DefinitionList';
import { Table } from '../../Table';
import Bullet, { MODE as BM } from '../../Bullet/index.js';
import MrcNumber from '../../MrcNumber';
import MrcDateTime from '../../MrcDateTime';
import * as _ from 'lodash';

export default class Strategy extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };

        props.getStrategyData().then((result) => {
            this.setState({ data: result });
        });
    }

    isValidApprovalItems() {
        return (
            this.state.data !== undefined &&
            this.state.data !== null &&
            this.state.data.approvalItems !== undefined &&
            this.state.data.approvalItems !== null &&
            this.state.data.approvalItems.length > 0
        );
    }

    isValidKeyIndicators() {
        return (
            this.state.data.keyIndicators !== undefined &&
            this.state.data.keyIndicators !== null &&
            this.state.data.keyIndicators.keyIndicators !== undefined &&
            this.state.data.keyIndicators.keyIndicators !== null &&
            this.state.data.keyIndicators.keyIndicators.indicators !== undefined &&
            this.state.data.keyIndicators.keyIndicators.indicators !== null
        );
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

    isDecisiveIndicator(indicator) {
        if (this.state.data.decisiveIndicators != null)
            if (this.state.data.decisiveIndicators.includes(indicator)) return '*';
            else return '';
        else return '';
    }

    getSystemDecision() {
        if (this.state.data.state === 'WAIT_FOR_REVIEW') {
            if (this.state.data.followUpState === 'BLOCKED') {
                return 'blocked';
            }
            if (this.state.data.followUpState === 'REJECTED') {
                return 'rejected';
            }
        } else {
            return 'manual';
        }
    }

    createStrategyForCustomer = (json, country) => {
        const indicators = json.keyIndicators.indicators;
        const selectedCreditProgramKey =
            json.selectedCreditProgram !== undefined && json.selectedCreditProgram !== null
                ? json.selectedCreditProgram
                : 'strategy.programs.general-customer';

        const renderIndicatorName = (indicatorName) => {
            const prefix =
                !_.isNil(this.state.data.decisiveIndicators) &&
                this.state.data.decisiveIndicators.includes(indicatorName)
                    ? '*'
                    : '';
            return prefix + lookup(indicatorName);
        };

        const makeExplanation = (status, indicator) => {
            const shouldRender = !(indicator.original.status === 'OK' || indicator.original.status === 'NA');
            return shouldRender ? lookup(indicator.original.indicatorName + '.' + indicator.original.status) : null;
        };

        const makeValue = (value, indicator) => {
            // descriptors with values 0 <= x <= 1 describing a percentage
            // value
            const percentageDescriptors = [
                'strategy.keyindicators.disposalrate',
                'strategy.keyindicators.utilizationrate',
            ];
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
            } else if (percentageDescriptors.includes(indicator.original.indicatorName)) {
                return _.isNaN(parseFloat(value)) ? (
                    lookup(value)
                ) : (
                    <MrcNumber isPercentage>{100 * parseFloat(value)}</MrcNumber>
                );
            } else if (limitDescriptors.includes(indicator.original.indicatorName)) {
                return (
                    <MrcNumber isCurrency country={country}>
                        {value}
                    </MrcNumber>
                );
            } else {
                return <MrcNumber>{value}</MrcNumber>;
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
                renderFn: (status) => {
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

        const indicatorsSequence = Object.keys(indicators).reduce((acc, key) => {
            const indicator = indicators[key];
            acc.push({ indicatorName: key, value: indicator[0], status: indicator[1] });
            return acc;
        }, []);

        const automaticDecision = this.state.data.automaticDecisionAt != null && (
            <DefinitionList
                list={[
                    {
                        term: lookup('strategy.data.decision.reviewAt'),
                        description: <MrcDateTime>{this.state.data.automaticDecisionAt}</MrcDateTime>,
                    },
                ]}
            />
        );

        return (
            <div className="mrc-details">
                <h3>{lookup('strategy.data.decision')}</h3>
                <p>{lookup('strategy.data.decision.' + this.state.data.strategyDecision)}</p>
                {automaticDecision}
                <Table
                    className="mrc-data-table"
                    title={lookup(selectedCreditProgramKey)}
                    columns={columns}
                    data={indicatorsSequence}
                />
            </div>
        );
    };

    render() {
        if (this.isValidApprovalItems() && this.isValidKeyIndicators()) {
            const data = this.state.data;
            return (
                <div className="mrc-strategy-data">
                    {this.createStrategyForCustomer(data.keyIndicators, this.props.country)}
                </div>
            );
        } else {
            return <h4 className="not-found">{lookup('strategy.data.none-available')}</h4>;
        }
    }
}

Strategy.propTypes = {
    data: PropTypes.array,
    ready: PropTypes.bool,
    getStrategyData: PropTypes.func,
    country: PropTypes.string,
};
