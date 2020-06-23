import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { COLOR as ICOLOR, SIZE as ISIZE } from '../icons';
import WarningSmallFilledIcon from '../icons/WarningSmallFilledIcon';
import { lookup } from '../Util/translations';

import './index.scss';

export default class ClientBlocked extends PureComponent {
    render() {
        let size = this.props.size === 'large' ? ISIZE.SMALL : ISIZE.XSMALL;
        return (
            <div className="mrc-ui-client-blocked">
                <WarningSmallFilledIcon size={size} color={ICOLOR.LIGHT_RED} />
                {this.props.text || lookup('mrc.customerdata.blocked')}
            </div>
        );
    }
}

ClientBlocked.propTypes = {
    size: PropTypes.oneOf(['large']),
    text: PropTypes.string,
};
