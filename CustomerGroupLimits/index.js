import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './index.scss';
import { lookup } from '../Util/translations';

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
                                <mrc-number show-currency-for-country={this.props.country}>
                                    {this.props.availableGroupLimit}
                                </mrc-number>
                            </td>
                        </tr>
                        <tr>
                            <td className="td-left">
                                <p>
                                    {lookup('mrc.label.exhaustionGroupLimit')}: <span> </span>
                                </p>
                            </td>
                            <td className="td-right">
                                <mrc-number show-currency-for-country={this.props.country}>
                                    {this.props.exhaustionGroupLimit}
                                </mrc-number>
                            </td>
                        </tr>
                        <tr>
                            <td className="td-left">
                                <p>
                                    {lookup('mrc.label.currentgrouplimit')}: <span> </span>
                                </p>
                            </td>
                            <td className="td-right">
                                <mrc-number show-currency-for-country={this.props.country}>
                                    {this.props.currentGroupLimit}
                                </mrc-number>
                            </td>
                        </tr>
                        <tr>
                            <td className="td-left">
                                <p>
                                    {lookup('mrc.label.requestedgrouplimit')}: <span> </span>
                                </p>
                            </td>
                            <td className="td-right">
                                <mrc-number
                                    dynamic={this.props.requestedGroupLimit}
                                    show-currency-for-country={this.props.country}
                                >
                                    {this.props.requestedGroupLimit}
                                </mrc-number>
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
                                    <mrc-number
                                        dynamic={this.props.approvedGroupLimitInst}
                                        show-currency-for-country={this.props.country}
                                    >
                                        {this.props.approvedGroupLimitInst}
                                    </mrc-number>
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
