import React, { Component } from 'react';
import Search from '../../Search';
import Button, { COLOR as BUTTONCOLOR, SIZE as BUTTONSIZE } from '../../Button';
import PropTypes from 'prop-types';
import { SimpleActionDock } from '../../ActionDock';
import { stickyOffsetFromCombined } from '../../Util/stickyUtil';
import _ from 'lodash';
import './index.scss';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import MrcNumber, { COUNTRY } from '../../MrcNumber';

export default class BigGroupSelection extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     selectedCustomers: {},
        // };
    }

    refreshStickyOffset() {
        stickyOffsetFromCombined({
            offsetSelector: '.mrc-ui-basic-grid-table thead tr:first-child th, .mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-basic-grid-table thead tr:last-child th')).forEach(
                    (e) => {
                        e.style.setProperty('--sticky-top', offset + 'px');
                    }
                ),
        });
        stickyOffsetFromCombined({
            offsetSelector: '.mrc-ui-pageheader',
            callback: (offset) =>
                Array.from(document.querySelectorAll('.mrc-ui-basic-grid-table thead tr:first-child th')).forEach(
                    (e) => {
                        e.style.setProperty('--sticky-top', offset + 'px');
                    }
                ),
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
                <table className="mrc-ui-basic-grid-table mrc-ui-bigroup-table">
                    <thead>
                        <tr>
                            <th className="mrc-biggroup-table-full-scolspan">
                                <h2>Customer Group</h2>
                                <div className="mrc-ui-form-box">
                                    <div className="mrc-ui-form-box-search-wrapper">
                                        <Search placeholder="Search by Id, Name..." />
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                Customer{' '}
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th>
                                Payment Method
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th>
                                Limit{' '}
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th>
                                Action
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, k) => {
                            return (
                                <tr key={k}>
                                    <td className="mrc-ui-basic-table-grid-customer-cell">
                                        <span>{d.customer}</span>&nbsp;<span>{d.customerId}</span>
                                    </td>
                                    <td>
                                        <div className="mrc-ui-cell-tr">{d.paymentMethod}</div>
                                    </td>
                                    <td>
                                        <div className="mrc-ui-cell-tr">
                                            <MrcNumber isCurrency country={COUNTRY.ES}>
                                                {d.limit}
                                            </MrcNumber>
                                        </div>
                                    </td>
                                    <td>
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

                <SimpleActionDock cancelText="Cancel" applyText="Apply" onApply={null} onCancel={null} />
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
