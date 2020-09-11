import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ActionDock from '../../ActionDock';
// import ModalDialog from '../../ModalDialog';
// import { FlexRow, FlexColumn } from '../../Flex';
import Button from '../../Button';
// import TextArea from '../../TextArea';
// import CheckCard from '../../CheckCard';
// import InputLabel from '../../InputLabel';

import './RejectionDock.scss';

export default class RejectionDock extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let { onConfirm, onReviewManual } = this.props;
        return (
            <React.Fragment>
                <ActionDock className="mrc-ui-rejection-dock">
                    <Button
                        id="mrc-ui-rejection-dock-confirm-btn"
                        text="Entscheidung akzeptieren"
                        color=""
                        onClick={onConfirm}
                    />
                    <Button
                        id="mrc-ui-rejection-dock-manual-btn"
                        text="Bitte in Zentrale prüfen"
                        color=""
                        onClick={onReviewManual}
                        isOutlined
                    />
                </ActionDock>
            </React.Fragment>
        );
    }
}

RejectionDock.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onReviewManual: PropTypes.func.isRequired,
    process: PropTypes.object.isRequired,
};
