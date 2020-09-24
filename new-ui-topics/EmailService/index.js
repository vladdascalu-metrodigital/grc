import React, { Component } from 'react';

import Search from '../../Search';
import Checkbox from '../../Checkbox';
import Button, { COLOR as BUTTONCOLOR, SIZE as BUTTONSIZE } from '../../Button';
import PropTypes from 'prop-types';
import AppShell from '../AppShell';
import { SimpleActionDock } from '../../ActionDock';
import Pill from '../../Pill';

import { stickyOffsetFromCombined } from '../../Util/stickyUtil';

import _ from 'lodash';

// import ArrowDownOutlinedIcon from '../../icons/ArrowDownOutlinedIcon';

import './index.scss';

export default class EmailService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectAll: false,
            selectedCustomers: {},
        };
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

    handleCustomerSelect(customerId) {
        this.setState({
            selectedCustomers: {
                ...this.state.selectedCustomers,
                [customerId]: !this.state.selectedCustomers[customerId],
            },
        });
    }

    handleCustomerSelectAll(data) {
        let selectedCustomers = {};

        data.forEach((v) => {
            selectedCustomers[v.customerId] = !this.state.selectAll;
        });

        this.setState({
            selectAll: !this.state.selectAll,
            selectedCustomers: {
                ...selectedCustomers,
            },
        });
    }

    render() {
        let { data } = this.props;
        return (
            <AppShell
                title="E-Mail Service"
                customerName="Betterlife GmbH Super Long Name ;aj;djf jja dfjo;asijf ajfoasjdf oasdjfi ajsodfj"
                customerId="15/116102"
                customerStatus=""
            >
                <table className="mrc-ui-basic-grid-table">
                    <thead>
                        <tr>
                            <th>
                                <h2>Customer Group</h2>
                                <div className="mrc-ui-form-box">
                                    <div className="mrc-ui-form-box-search-wrapper">
                                        <Search placeholder="Search by Id, Name..." />
                                    </div>

                                    <div>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                                        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                                        no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                                        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                                        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                                        Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in
                                        vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla
                                        facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent
                                        luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
                                        dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                                        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
                                        veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
                                        ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
                                        vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla
                                        facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent
                                        luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber
                                        tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
                                        mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer
                                        adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                                        aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                                        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
                                        autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                                        consequat, vel illum dolore eu feugiat nulla facilisis.{' '}
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Checkbox
                                    checked={this.state.selectAll}
                                    onChange={() => this.handleCustomerSelectAll(data)}
                                />
                            </th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Dunning Email</th>
                            <th>Action</th>
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
                                            checked={this.state.selectedCustomers[d.customerId]}
                                            onChange={() => this.handleCustomerSelect(d.customerId)}
                                        />
                                    </td>
                                    <td className="mrc-ui-basic-table-grid-customer-cell">
                                        <span>{d.customer}</span> <span>{d.customerId}</span>
                                    </td>
                                    <td>
                                        <Pill text={d.dunningEmailStatus} type={type} withIcon />
                                    </td>
                                    <td>{d.dunningEmail}</td>
                                    <td>
                                        <Button
                                            size={BUTTONSIZE.SMALL}
                                            text="Edit"
                                            isOutlined
                                            color={BUTTONCOLOR.PRIMARY}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <SimpleActionDock cancelText="Cancel" applyText="Edit Selection" />
            </AppShell>
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
