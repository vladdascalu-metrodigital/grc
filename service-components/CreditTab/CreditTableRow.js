import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreditTableRowA from './CreditTableRowA';
import CreditTableRowB from './CreditTableRowB';
import CreditTableRowD from './CreditTableRowD';

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
        const newLimitMissing =
            (historical && _.isNil(_.get(customer, 'limit.current'))) ||
            (!historical && _.isNil(_.get(customer, 'limit.new')));
        if (customer.type === 'cash') {
            return (
                <CreditTableRowD
                    {...{
                        ...this.props,
                        onExpand: () => this.toggle(),
                        onHover: flag => this.hover(flag),
                        isExpanded: this.state.isExpanded,
                        isHovered: this.state.isHovered,
                        canToggle: !historical || _.get(customer, 'isBlocked'),
                        type: isZebra ? 'zebra' : null,
                    }}
                />
            );
        } else if (newLimitMissing) {
            // Closed and approved request: requested, current and approved limit exists
            return (
                <CreditTableRowB
                    {...{
                        ...this.props,
                        onExpand: () => this.toggle(),
                        onHover: flag => this.hover(flag),
                        isExpanded: this.state.isExpanded,
                        isHovered: this.state.isHovered,
                        canToggle: !historical || _.get(customer, 'isBlocked'),
                        type: isZebra ? 'zebra' : null,
                    }}
                />
            );
        } else {
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
                    }}
                />
            );
        }
    }
}

CreditTableRow.propTypes = {
    id: PropTypes.string,
    historical: PropTypes.bool,
    country: PropTypes.string,
    isZebra: PropTypes.bool,
    customer: PropTypes.object,
    stickyOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
