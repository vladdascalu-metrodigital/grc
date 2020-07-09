import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { lookup } from '../Util/translations';

import MrcNumber from '../MrcNumber';

import './index.scss';

export default class CustomerGroupLimits extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mrc-customer-group">
                <h3 className="span-metro-blue">{lookup('mrc.label.customergroup')}</h3>
                <table className="table-group-limit">
                    <tbody>
                        <tr>
                            <td className="td-left">
                                <p>
                                    {lookup('mrc.label.availablegrouplimit')}: <span> </span>
                                </p>
                            </td>
                            <td className="td-right">
                                <MrcNumber isCurrency country={this.props.country}>
                                    {this.props.availableGroupLimit}
                                </MrcNumber>
                            </td>
                        </tr>
                        <tr>
                            <td className="td-left">
                                <p>
                                    {lookup('mrc.label.exhaustionGroupLimit')}: <span> </span>
                                </p>
                            </td>
                            <td className="td-right">
                                <MrcNumber isCurrency country={this.props.country}>
                                    {this.props.exhaustionGroupLimit}
                                </MrcNumber>
                            </td>
                        </tr>
                        <tr>
                            <td className="td-left">
                                <p>
                                    {lookup('mrc.label.currentgrouplimit')}: <span> </span>
                                </p>
                            </td>
                            <td className="td-right">
                                <MrcNumber isCurrency country={this.props.country}>
                                    {this.props.currentGroupLimit}
                                </MrcNumber>
                            </td>
                        </tr>
                        <tr>
                            <td className="td-left">
                                <p>
                                    {lookup('mrc.label.requestedgrouplimit')}: <span> </span>
                                </p>
                            </td>
                            <td className="td-right">
                                <MrcNumber
                                    dynamic={this.props.requestedGroupLimit}
                                    isCurrency
                                    country={this.props.country}
                                >
                                    {this.props.requestedGroupLimit}
                                </MrcNumber>
                            </td>
                        </tr>
                        {this.props.hideApprovedGroupLimit ? null : (
                            <tr>
                                <td className="td-left">
                                    <p>
                                        {lookup('mrc.label.approvedgrouplimit')}: <span> </span>
                                    </p>
                                </td>
                                <td className="td-right">
                                    <MrcNumber
                                        dynamic={this.props.approvedGroupLimitInst}
                                        isCurrency
                                        country={this.props.country}
                                    >
                                        {this.props.approvedGroupLimitInst}
                                    </MrcNumber>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

CustomerGroupLimits.propTypes = {
    country: PropTypes.string,
    availableGroupLimit: PropTypes.number,
    exhaustionGroupLimit: PropTypes.number,
    currentGroupLimit: PropTypes.number,
    requestedGroupLimit: PropTypes.number,
    approvedGroupLimitInst: PropTypes.number,
    hideApprovedGroupLimit: PropTypes.bool,
};
