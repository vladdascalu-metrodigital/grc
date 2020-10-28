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
        this.state = {
            selectedCustomers: [],
            searchResult: [],
        };
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

    componentDidUpdate() {
        this.refreshStickyOffset();
    }

    handleCustomerAdd(customer) {
        if (!this.state.selectedCustomers.includes(customer)) {
            this.setState({ selectedCustomers: [...this.state.selectedCustomers, customer] });
        }
    }

    handleCustomerRemove(customer) {
        if (this.state.selectedCustomers.includes(customer)) {
            this.setState({
                selectedCustomers: this.state.selectedCustomers.filter(function (selectedCustomer) {
                    return selectedCustomer !== customer;
                }),
            });
        }
    }

    handleShowSelectedCustomers(customer) {
        if (this.state.selectedCustomers.includes(customer)) {
            this.setState({
                selectedCustomers: this.state.selectedCustomers.filter(function (selectedCustomer) {
                    return selectedCustomer !== customer;
                }),
            });
        }
    }

    handleSearch(str) {
        if (str.length > 2) {
            let { customers } = this.props;
            this.setState({ searchResult: customers });
        } else {
            this.setState({ searchResult: [] });
        }
    }

    renderTable(searchResult) {
        if (searchResult.length > 0) {
            return (
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
                        {searchResult.map((customer, k) => {
                            let button = {};
                            if (this.state.selectedCustomers.includes(customer)) {
                                button = (
                                    <Button
                                        size={BUTTONSIZE.SMALL}
                                        text="Remove"
                                        isOutlined
                                        color={BUTTONCOLOR.DANGER}
                                        onClick={() => this.handleCustomerRemove(customer)}
                                    />
                                );
                            } else {
                                button = (
                                    <Button
                                        size={BUTTONSIZE.SMALL}
                                        text="Add"
                                        isOutlined
                                        color={BUTTONCOLOR.INTERACTION}
                                        onClick={() => this.handleCustomerAdd(customer)}
                                    />
                                );
                            }
                            return (
                                <tr key={k}>
                                    <td>
                                        <div className="mrc-ui-basic-table-grid-cell-customer">
                                            <span className="mrc-ui-basic-table-grid-cell-customer-name">
                                                {customer.customer}
                                            </span>
                                            <span className="mrc-ui-basic-table-grid-cell-customer-id">
                                                {customer.customerId}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="mrc-ui-grid-table-cell-align-right">
                                        <span>{customer.paymentMethod}</span>
                                    </td>
                                    <td className="mrc-ui-grid-table-cell-align-right">
                                        <MrcNumber isCurrency country={COUNTRY.ES}>
                                            {customer.limit}
                                        </MrcNumber>
                                    </td>
                                    <td className="mrc-ui-grid-table-cell-align-right">{button}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        } else {
            return <div>no search results</div>;
        }
    }

    render() {
        let { selectedCustomers, searchResult } = this.state;
        let button;
        if (selectedCustomers.length > 0) {
            button = (
                <Button
                    size={BUTTONSIZE.LARGE}
                    text={'Show ' + selectedCustomers.length + ' selected Customers'}
                    color={BUTTONCOLOR.INTERACTION}
                    onClick={() => this.setState({ searchResult: this.state.selectedCustomers })}
                />
            );
        } else {
            button = (
                <Button
                    size={BUTTONSIZE.LARGE}
                    text={'No Customers selected'}
                    color={BUTTONCOLOR.INTERACTION}
                    disabled={true}
                    onClick={() => this.setState({ searchResult: this.state.selectedCustomers })}
                />
            );
        }

        return (
            <React.Fragment>
                <div className="mrc-ui-basic-grid-table-form">
                    <h3>Customer Group</h3>
                    <div className="mrc-ui-form-box">
                        <div className="mrc-ui-form-box-search-wrapper">
                            <Search
                                placeholder="Search by Id, Name..."
                                onChangeDelayed={(str) => this.handleSearch(str)}
                                onEnterSearch={(str) => this.handleSearch(str)}
                            />
                        </div>
                        {button}
                    </div>
                </div>
                {this.renderTable(searchResult)}

                {/* <SimpleActionDock cancelText="Cancel" applyText="Apply" onApply={null} onCancel={null} /> */}
            </React.Fragment>
        );
    }
}

BigGroupSelection.propTypes = {
    customers: PropTypes.arrayOf(
        PropTypes.shape({
            customer: PropTypes.string,
            customerId: PropTypes.string,
            paymentMethod: PropTypes.string,
            limit: PropTypes.string,
        })
    ),
};

BigGroupSelection.defaultProps = {
    customers: [],
};
