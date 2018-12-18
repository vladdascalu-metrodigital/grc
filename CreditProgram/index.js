import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {lookup} from '../../global/Util/translations';

export default class CreditProgram extends Component {

    constructor(props) {
        super(props);
        this.state = {
            availableCreditPrograms: [],
            selectedCreditProgram: ''
        };
    }

    componentDidMount() {
        this.setAvailableCreditProgramsToState(this.props.limitRequestId);
    }

    handleCreditProgramChange = (event) => {
        const selectedCreditPrograms =  event.target.value;
        const creditProgram = this.createCreditProgram(selectedCreditPrograms);
        this.setState({...this.state, selectedCreditProgram: selectedCreditPrograms});
        this.props.setValidity(this.setValidCreditProgram(selectedCreditPrograms));
        return this.props.setCreditPrograms(this.props.limitRequestId, creditProgram);
    };


    createCreditProgram(selectedCreditProgram) {
        return {
            creditProgram: selectedCreditProgram,
            availableCreditPrograms: this.state.availableCreditPrograms
        };
    }

    setAvailableCreditProgramsToState(requestId) {
        this.props.getCreditPrograms(requestId).then(data => {
            for (let i in data) {
                const receivedSelectedCreditProgram = (i !== '' ? i : null);
                this.setState({...this.state, selectedCreditProgram: receivedSelectedCreditProgram});
                for (let j in data[i]) {
                    this.setState({...this.state, availableCreditPrograms: data[i][j]});
                }
            }
            this.props.setValidity(this.setValidCreditProgram(this.state.selectedCreditProgram));
        });
    }

    setValidCreditProgram(selectedCreditPrograms) {
       return ((this.state.availableCreditPrograms.length > 0 && (selectedCreditPrograms === null || selectedCreditPrograms ==='')) ? false : true);
    }

    toOptionProgram(t) {return <option key={t} value={t}>{lookup(t)}</option>;}

    createCreditProgramOptions() {
        if (this.state.availableCreditPrograms.length > 0) {
            if (this.state.availableCreditPrograms.length === 1) {
                return this.state.availableCreditPrograms.map(this.toOptionProgram);
            } else {
                return [<option key='null'/>].concat(this.state.availableCreditPrograms.map(this.toOptionProgram));
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="mrc-credit-programs">
                <label
                    hidden={this.state.availableCreditPrograms.length > 1 ? false : true}>{lookup('creditlimit.choose')}</label>
                <select className='mrc-credit-programs-select' name='creditPrograms'
                        value={(this.state.selectedCreditProgram == null || this.state.selectedCreditProgram == '') ? '' : this.state.selectedCreditProgram}
                        onChange={this.handleCreditProgramChange}
                        required={this.state.availableCreditPrograms.length > 1 ? true : false}
                        disabled={this.state.availableCreditPrograms.length === 1 ? true : false}
                        hidden={this.state.availableCreditPrograms.length === 0 ? true : false}>
                    {this.createCreditProgramOptions()}
                </select>
            </div>);
    }
}

CreditProgram.propTypes = {
    limitRequestId: PropTypes.string,
    getCreditPrograms: PropTypes.func,
    setCreditPrograms: PropTypes.func,
    setValidity: PropTypes.func
};
