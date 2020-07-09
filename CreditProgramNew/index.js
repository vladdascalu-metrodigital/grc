import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';
import BoxWithTitle from '../BoxWithTitle';
import KeyValueGroup, { Key, Value } from '../KeyValueGroup';
import ModalDialog from '../ModalDialog';
import * as _ from 'lodash';

export default class CreditProgram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableCreditPrograms: [],
            selectedCreditProgram:
                props.defaultText !== undefined && !_.isNil(props.defaultText) ? props.defaultText : '',
            selectedOption: '',
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        this._isMount = true;
        this.setAvailableCreditProgramsToState(this.props.limitRequestId);
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    toggleModal() {
        this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
    }

    saveCreditProgramChange = () => {
        const selectedCreditProgram = this.state.selectedOption;
        const creditProgram = this.createCreditProgram(selectedCreditProgram);
        this.setState({ ...this.state, selectedCreditProgram: selectedCreditProgram });
        this.props.setValidity(this.setValidCreditProgram(selectedCreditProgram));
        return this.props.setCreditPrograms(this.props.limitRequestId, creditProgram);
    };

    createCreditProgram(selectedCreditProgram) {
        return {
            selectedCreditProgram: selectedCreditProgram,
            availableCreditPrograms: this.state.availableCreditPrograms,
        };
    }

    setAvailableCreditProgramsToState(requestId) {
        if (this.props.defaultText) {
            return;
        }
        this.props.getCreditPrograms(requestId).then((data) => {
            let selectedCreditProgram = data['selectedCreditProgram'];
            let availableCreditPrograms = data['availableCreditPrograms'];
            if (!this._isMount) {
                return;
            }
            this.setState({ ...this.state, availableCreditPrograms: availableCreditPrograms });
            if (availableCreditPrograms && availableCreditPrograms.length === 1) {
                selectedCreditProgram = availableCreditPrograms[0];
                const creditProgram = this.createCreditProgram(selectedCreditProgram);
                if (!this.props.readOnly) {
                    this.props.setCreditPrograms(this.props.limitRequestId, creditProgram);
                }
            }
            this.setState({ ...this.state, selectedCreditProgram: selectedCreditProgram });
            this.setState({ ...this.state, selectedOption: selectedCreditProgram });
            if (!this.props.readOnly) {
                this.props.setValidity(this.setValidCreditProgram(this.state.selectedCreditProgram));
            }
        });
    }

    setValidCreditProgram(selectedCreditPrograms) {
        return this.state.availableCreditPrograms &&
            this.state.availableCreditPrograms.length > 0 &&
            (selectedCreditPrograms === null || selectedCreditPrograms === '')
            ? false
            : true;
    }

    toOptionProgram(t) {
        return (
            <option key={t} value={t}>
                {lookup(t)}
            </option>
        );
    }

    createCreditProgramOptions() {
        if (this.state.availableCreditPrograms && this.state.availableCreditPrograms.length > 0) {
            if (this.state.availableCreditPrograms && this.state.availableCreditPrograms.length === 1) {
                return this.state.availableCreditPrograms.map(this.toOptionProgram);
            } else {
                return [<option key="null" />].concat(this.state.availableCreditPrograms.map(this.toOptionProgram));
            }
        } else {
            return null;
        }
    }

    handleChangeCreditProgram = (e) => {
        this.setState({ ...this.state, selectedOption: e.target.value });
    };

    modalDialogContent() {
        return (
            <div>
                <div className="mrc-ui-input mrc-ui-select clear-both">
                    <label className="mrc-ui-label">{lookup('creditlimit.choose')}</label>
                    <select
                        name="creditPrograms"
                        className="mrc-ui-select-input"
                        value={
                            this.state.selectedOption == null || this.state.selectedOption == ''
                                ? ''
                                : this.state.selectedOption
                        }
                        onChange={this.handleChangeCreditProgram}
                        required={
                            this.state.availableCreditPrograms && this.state.availableCreditPrograms.length > 1
                                ? true
                                : false
                        }
                    >
                        {this.createCreditProgramOptions()}
                    </select>
                </div>
                <div className="mrc-btn-group">
                    <button
                        type="button"
                        className="mrc-btn mrc-primary-button mrc-ui-button-small"
                        onClick={() => {
                            this.saveCreditProgramChange();
                            this.toggleModal();
                        }}
                        disabled={_.isEmpty(this.state.selectedOption)}
                    >
                        {lookup('mrc.creditprogram.save')}
                    </button>
                    <button
                        type="button"
                        className="mrc-btn mrc-secondary-button mrc-ui-button-small mrc-ui-button-secondary"
                        onClick={() => {
                            const selectedCreditProgram = this.state.selectedCreditProgram;
                            this.setState({ ...this.state, selectedOption: selectedCreditProgram });
                            this.toggleModal();
                        }}
                    >
                        {lookup('mrc.creditprogram.cancel')}
                    </button>
                </div>
            </div>
        );
    }

    render() {
        if (
            this.props.readOnly ||
            !this.state.availableCreditPrograms ||
            (this.state.availableCreditPrograms && this.state.availableCreditPrograms.length <= 1)
        ) {
            return (
                <BoxWithTitle title={lookup('mrc.credittab.creditprogram')}>
                    <KeyValueGroup>
                        <Key>{lookup('mrc.credittab.creditprogramselection') + ' *'}</Key>
                        <Value>
                            {_.isEmpty(this.state.selectedCreditProgram)
                                ? '-'
                                : lookup(this.state.selectedCreditProgram)}
                        </Value>
                    </KeyValueGroup>
                </BoxWithTitle>
            );
        }
        return (
            <BoxWithTitle
                title={lookup('mrc.credittab.creditprogram')}
                action={{ title: lookup('mrc.credittab.creditprogramEdit'), fn: this.toggleModal }}
            >
                <KeyValueGroup>
                    <Key>{lookup('mrc.credittab.selectedcreditprogram') + ' *'}</Key>
                    <Value>
                        {_.isEmpty(this.state.selectedCreditProgram) ? '-' : lookup(this.state.selectedCreditProgram)}
                    </Value>
                </KeyValueGroup>
                {this.state.isModalVisible ? (
                    <ModalDialog
                        toggle={() => {
                            const selectedCreditProgram = this.state.selectedCreditProgram;
                            this.setState({ ...this.state, selectedOption: selectedCreditProgram });
                            this.toggleModal();
                        }}
                        content={this.modalDialogContent()}
                        title={lookup('mrc.creditprogram.modaltitle')}
                    />
                ) : null}
            </BoxWithTitle>
        );
    }
}

CreditProgram.propTypes = {
    limitRequestId: PropTypes.string,
    getCreditPrograms: PropTypes.func,
    setCreditPrograms: PropTypes.func,
    setValidity: PropTypes.func,
    defaultText: PropTypes.string,
    readOnly: PropTypes.bool,
};
