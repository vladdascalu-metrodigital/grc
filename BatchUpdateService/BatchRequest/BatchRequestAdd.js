import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBatchRequests } from './service';
import { lookup } from '../../Util/translations';
import ModalDialog from '../../ModalDialog';
import MrcSpinner from '../../Util/MrcSpinner';
import BatchRequestAddModal from './BatchRequestAddModal';

class BatchRequestAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal = (withRefresh) => {
        this.setState((prevState) => ({
            isModalVisible: !prevState.isModalVisible,
        }));
        if (withRefresh) {
            this.props.fetchBatchRequests();
        }
    };

    render() {
        return (
            <div className="batch-request-add">
                <div>
                    <button
                        type="button"
                        className="mrc-primary-large-add-button batch-request-add-button"
                        onClick={() => this.toggleModal()}
                        value={lookup('mrc.upload')}
                    >
                        {lookup('mrc.upload')}
                    </button>
                </div>
                {this.state.isModalVisible ? (
                    <ModalDialog
                        toggle={() => this.toggleModal()}
                        content={
                            <BatchRequestAddModal
                                allowedCountries={this.props.allowedCountries}
                                finish={(withRefresh) => this.toggleModal(withRefresh)}
                            />
                        }
                        title={lookup('mrc.batchupdate.modaltitle.upload')}
                    />
                ) : null}
                {this.state.loading && <MrcSpinner />}
            </div>
        );
    }
}

BatchRequestAdd.propTypes = {
    allowedCountries: PropTypes.arrayOf(PropTypes.string),
    fetchBatchRequests: PropTypes.func,
};

export default connect(null, function (dispatch) {
    return {
        fetchBatchRequests: () => fetchBatchRequests(dispatch),
    };
})(BatchRequestAdd);
