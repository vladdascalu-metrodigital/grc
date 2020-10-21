import React, { Component } from 'react';
import Search from '../../Search';
import Button, { COLOR as BUTTONCOLOR, SIZE as BUTTONSIZE } from '../../Button';
import PropTypes from 'prop-types';
import { stickyOffsetFromCombined } from '../../Util/stickyUtil';
import _ from 'lodash';
import './index.scss';
import '../EmailService/MrcUiBasicGridTable.scss';

import ChevronDownIcon from '../../icons/ChevronDownIcon';
import MrcNumber, { COUNTRY } from '../../MrcNumber';

export default class BigGroupSelection extends Component {
    constructor(props) {
        super(props);
    }

    refreshStickyOffset() {
        stickyOffsetFromCombined({
            offsetSelector: '.mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-basic-grid-table-form')).forEach((e) => {
                    e.style.setProperty('--sticky-top', offset + 'px');
                }),
        });

        stickyOffsetFromCombined({
            offsetSelector: ' .mrc-ui-basic-grid-table-form, .mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-basic-grid-table-header th')).forEach((e) => {
                    e.style.setProperty('--sticky-top', offset + 'px');
                }),
        });

        stickyOffsetFromCombined({
            offsetSelector: '.mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-big-group-right-column')).forEach((e) => {
                    e.style.setProperty('--sticky-top', offset + 'px');
                }),
        });
    }

    componentDidMount() {
        this.refreshStickyOffset();
        window.addEventListener('resize', _.debounce(this.refreshStickyOffset, 150));
    }

    render() {
        let { data } = this.props;
        // let { selectedCustomers } = this.state;
        return (
            <React.Fragment>
                <div className="mrc-ui-basic-grid-table-form">
                    <h3>Customer Group</h3>
                    <div className="mrc-ui-form-box">
                        <div className="mrc-ui-form-box-search-wrapper">
                            <Search placeholder="Search by Id, Name..." />
                        </div>
                    </div>
                </div>
                <table
                    className="mrc-ui-basic-grid-table"
                    style={{ '--mrc-ui-grid-template-columns': '2fr 1fr 1fr 1fr' }}
                >
                    <thead>
                        <tr className="mrc-ui-basic-grid-table-header mrc-ui-basic-grid-table-header-sticky">
                            <th>
                                <span>Customer</span>
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th className="mrc-ui-grid-table-cell-align-right">
                                <span>Payment Method</span>
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th className="mrc-ui-grid-table-cell-align-right">
                                <span>Limit</span>
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th className="mrc-ui-grid-table-cell-align-right">
                                <span>Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, k) => {
                            return (
                                <tr key={k}>
                                    <td>
                                        <div className="mrc-ui-basic-table-grid-cell-customer">
                                            <span className="mrc-ui-basic-table-grid-cell-customer-name">
                                                {d.customer}
                                            </span>
                                            <span className="mrc-ui-basic-table-grid-cell-customer-id">
                                                {d.customerId}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="mrc-ui-grid-table-cell-align-right">
                                        <span>{d.paymentMethod}</span>
                                    </td>
                                    <td className="mrc-ui-grid-table-cell-align-right">
                                        <MrcNumber isCurrency country={COUNTRY.ES}>
                                            {d.limit}
                                        </MrcNumber>
                                    </td>
                                    <td className="mrc-ui-grid-table-cell-align-right">
                                        <Button
                                            size={BUTTONSIZE.SMALL}
                                            text="Add"
                                            isOutlined
                                            color={BUTTONCOLOR.PRIMARY}
                                            onClick={() => this.setState({ showRowEditModal: d })}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* <SimpleActionDock cancelText="Cancel" applyText="Apply" onApply={null} onCancel={null} /> */}
            </React.Fragment>
        );
    }
}

BigGroupSelection.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            customer: PropTypes.string,
            customerId: PropTypes.string,
            paymentMethod: PropTypes.string,
            limit: PropTypes.string,
        })
    ),
};

BigGroupSelection.defaultProps = {
    data: [],
};
