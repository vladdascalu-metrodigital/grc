import React, { Component } from 'react';

import Search from '../../Search';
import Checkbox from '../../Checkbox';
import Button, { COLOR as BUTTONCOLOR, SIZE as BUTTONSIZE } from '../../Button';
import PropTypes from 'prop-types';

import { SimpleActionDock } from '../../ActionDock';
import Pill from '../../Pill';

import { stickyOffsetFromCombined } from '../../Util/stickyUtil';

import _ from 'lodash';

import SingleEMailEditModalDialog from './SingleEMailEditModalDialog';
import MultipleEMailEditModalDialog from './MultipleEMailEditModalDialog';

import './index.scss';
import './MrcUiBasicGridTable.scss';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

import Select from '../../Select';

export default class EmailService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectAll: false,
            selectedCustomers: {},
            showRowEditModal: null,
            showMultiRowEditModal: null,
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
    }

    componentDidMount() {
        this.refreshStickyOffset();
        window.addEventListener('resize', _.debounce(this.refreshStickyOffset, 150));
    }

    handleCustomerSelect(arrayId) {
        this.setState({
            selectAll: false,
            selectedCustomers: {
                ...this.state.selectedCustomers,
                [arrayId]: !this.state.selectedCustomers[arrayId],
            },
        });
    }

    handleCustomerSelectAll(data) {
        let selectedCustomers = {};

        if (!this.state.selectAll) {
            data.forEach((v, k) => {
                selectedCustomers[k] = !this.state.selectAll;
            });
        }

        this.setState({
            selectAll: !this.state.selectAll,
            selectedCustomers: {
                ...selectedCustomers,
            },
        });
    }

    render() {
        let { data } = this.props;
        let { showRowEditModal, showMultiRowEditModal, selectedCustomers } = this.state;
        let options = [
            ['NULL', 'all'],
            ['1', 'approved'],
            ['2', 'pending'],
            ['3', 'Domain verified'],
        ];
        return (
            <React.Fragment>
                <div className="mrc-ui-basic-grid-table-form">
                    <h3>Customer Group</h3>
                    <div className="mrc-ui-form-box">
                        <div className="mrc-ui-form-box-search-wrapper">
                            <Search placeholder="Search by Id, Name..." />
                        </div>
                        <div>
                            <Select options={options} value={'0'} onChange="" />
                        </div>
                    </div>
                </div>
                <table
                    className="mrc-ui-basic-grid-table mrc-ui-email-service-table"
                    style={{ '--mrc-ui-grid-template-columns': '2.3rem 3fr 1fr 1fr 1fr' }}
                >
                    <thead>
                        <tr className="mrc-ui-basic-grid-table-header mrc-ui-basic-grid-table-header-sticky">
                            <th>
                                <Checkbox
                                    checked={this.state.selectAll}
                                    onChange={() => this.handleCustomerSelectAll(data)}
                                />
                            </th>
                            <th>
                                <span>Customer</span>
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th>
                                <span>Status</span>
                                <span className="mrc-ui-basic-grid-table-sort-icon">
                                    <ChevronDownIcon size="inline" color="current-color" />
                                </span>
                            </th>
                            <th>
                                <span>Dunning Email</span>
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
                            let type = 'success';
                            if (d.dunningEmailStatus != 'approved') {
                                type = 'danger';
                            }
                            return (
                                <tr key={k}>
                                    <td>
                                        <Checkbox
                                            checked={this.state.selectedCustomers[k]}
                                            onChange={() => this.handleCustomerSelect(k)}
                                        />
                                    </td>
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
                                    <td>
                                        <Pill text={d.dunningEmailStatus} type={type} withIcon />
                                    </td>
                                    <td className="mrc-ui-basic-table-grid-dunning-email-cell">{d.dunningEmail}</td>
                                    <td className="mrc-ui-grid-table-cell-align-right">
                                        <Button
                                            size={BUTTONSIZE.SMALL}
                                            text="Edit"
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

                {showRowEditModal && (
                    <SingleEMailEditModalDialog
                        customer={showRowEditModal}
                        onCancel={() => this.setState({ showRowEditModal: null })}
                        onOk={() => this.setState({ showRowEditModal: null })}
                    />
                )}

                {showMultiRowEditModal && (
                    <MultipleEMailEditModalDialog
                        customers={data}
                        selectedCustomers={selectedCustomers}
                        onCancel={() => this.setState({ showMultiRowEditModal: false })}
                        onOk={() => this.setState({ showMultiRowEditModal: false })}
                    />
                )}

                <SimpleActionDock
                    cancelText="Cancel"
                    applyText="Edit Selection"
                    applyDisabled={!Object.values(this.state.selectedCustomers).includes(true)}
                    cancelDisabled={!Object.values(this.state.selectedCustomers).includes(true)}
                    onApply={() => this.setState({ showMultiRowEditModal: true })}
                    onCancel={() =>
                        this.setState({
                            selectAll: false,
                            selectedCustomers: {},
                        })
                    }
                />
            </React.Fragment>
        );
    }
}

EmailService.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            customer: PropTypes.string,
            customerId: PropTypes.string,
            dunningEmail: PropTypes.string,
            dunningEmailStatus: PropTypes.string,
        })
    ),
};

EmailService.defaultProps = {
    data: [],
};
