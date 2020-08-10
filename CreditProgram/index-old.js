import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { lookup } from '../Util/translations';

export default class CreditProgramOld extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableCreditPrograms: [],
            selectedCreditProgram: '',
        };
    }

    componentDidMount() {
        this._isMount = true;
        this.setAvailableCreditProgramsToState(this.props.limitRequestId);
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    handleCreditProgramChange = (event) => {
        const selectedCreditProgram = event.target.value;
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
                this.props.setCreditPrograms(this.props.limitRequestId, creditProgram);
            }
            this.setState({ ...this.state, selectedCreditProgram: selectedCreditProgram });
            this.props.setValidity(this.setValidCreditProgram(this.state.selectedCreditProgram));
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

    render() {
        return (
            <div className="mrc-credit-programs">
                <label
                    hidden={
                        this.state.availableCreditPrograms && this.state.availableCreditPrograms.length > 1
                            ? false
                            : true
                    }
                >
                    {lookup('creditlimit.choose')}
                </label>
                <select
                    name="creditPrograms"
                    value={
                        this.state.selectedCreditProgram == null || this.state.selectedCreditProgram == ''
                            ? ''
                            : this.state.selectedCreditProgram
                    }
                    onChange={this.handleCreditProgramChange}
                    required={
                        this.state.availableCreditPrograms && this.state.availableCreditPrograms.length > 1
                            ? true
                            : false
                    }
                    disabled={
                        this.state.availableCreditPrograms && this.state.availableCreditPrograms.length === 1
                            ? true
                            : false
                    }
                    hidden={
                        !this.state.availableCreditPrograms ||
                        (this.state.availableCreditPrograms && this.state.availableCreditPrograms.length === 0)
                            ? true
                            : false
                    }
                >
                    {this.createCreditProgramOptions()}
                </select>
            </div>
        );
    }
}

CreditProgramOld.propTypes = {
    limitRequestId: PropTypes.string,
    getCreditPrograms: PropTypes.func,
    setCreditPrograms: PropTypes.func,
    setValidity: PropTypes.func,
};
