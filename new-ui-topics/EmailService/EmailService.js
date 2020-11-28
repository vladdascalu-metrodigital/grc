import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DunningEmailTable from '../MrcUiTable/DunningEmailTable';

export default class EmailServiceReactTableExample extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data } = this.props;

        return <DunningEmailTable tableData={data} />;
    }
}

EmailServiceReactTableExample.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            customer: PropTypes.string,
            customerId: PropTypes.string,
            dunningEmail: PropTypes.string,
            dunningEmailStatus: PropTypes.string,
        })
    ),
};

EmailServiceReactTableExample.defaultProps = {
    data: [],
};
