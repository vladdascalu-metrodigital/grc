import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreditTableRowA from './CreditTableRowA';

import * as _ from 'lodash';

export default class CreditTableRow extends Component {
    constructor(props) {
        super(props);
        this.toggle.bind(this);
        this.hover.bind(this);
        this.state = {
            isHovered: false,
            isExpanded: false,
        };
    }

    hover(hoverState) {
        this.setState({
            isHovered: hoverState,
        });
    }

    toggle() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    render() {
        let { isZebra, customer, historical } = this.props;
        // We should make a choice here, which type of row
        return (
            <CreditTableRowA
                {...{
                    ...this.props,
                    onExpand: () => this.toggle(),
                    onHover: flag => this.hover(flag),
                    isExpanded: this.state.isExpanded,
                    isHovered: this.state.isHovered,
                    canToggle: !historical || _.get(customer, 'isBlocked'),
                    type: isZebra ? 'zebra' : null,
                    isCashCustomer:
                        _.get(customer, 'limit.current.amount') === 0 ||
                        _.isNil(_.get(customer, 'limit.current.amount')),
                }}
            />
        );
    }
}

CreditTableRow.propTypes = {
    id: PropTypes.string,
    historical: PropTypes.bool,
    isCashCustomer: PropTypes.bool,
    country: PropTypes.string,
    isZebra: PropTypes.bool,
    customer: PropTypes.object,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
