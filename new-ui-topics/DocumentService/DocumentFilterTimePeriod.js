import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { filterPropType, filterArrayPropType } from './documentFilterObjects';

import Button from '../../Button';
import PlusIconStroke from '../../icons/PlusIconStroke';
import { ModalDialogSimple } from '../../ModalDialog';
import DatePicker from '../../DatePicker';
import { FlexRow } from '../../Flex';

export default class DocumentFilterTimePeriod extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.confirmFilters = this.confirmFilters.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        this.state = {
            showModal: false,
            modalFilters: {},
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.showModal) {
            let syncedModalFilters = {};
            props.activeFilters.forEach((sf) => (syncedModalFilters[sf.name] = sf));
            return {
                modalFilters: syncedModalFilters,
            };
        }
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    confirmFilters() {
        this.toggleModal();
        this.props.onConfirm(Object.values(this.state.modalFilters).filter((f) => !!f.value));
    }

    handleDateChange(filterName, changedFilter) {
        this.setState({
            modalFilters: {
                ...this.state.modalFilters,
                [filterName]: changedFilter,
            },
        });
    }

    render() {
        let { showModal, modalFilters } = this.state;
        let { buttonText, modalTitle, fromDateFilter, toDateFilter } = this.props;
        let fromDate = modalFilters[fromDateFilter.name] && modalFilters[fromDateFilter.name].value;
        let toDate = modalFilters[toDateFilter.name] && modalFilters[toDateFilter.name].value;
        console.log('this.props');
        console.log(this.props);
        console.log('this.state');
        console.log(this.state);
        return (
            <div>
                <Button size="small-round" onClick={this.toggleModal}>
                    {buttonText} <PlusIconStroke size="inline" color="current-color" strokeWidth="midi" />
                </Button>
                {showModal && (
                    <ModalDialogSimple title={modalTitle} onCancel={this.toggleModal} onOk={this.confirmFilters}>
                        <FlexRow justifyContent="stretch" gap="medium">
                            <DatePicker
                                label="From"
                                selected={fromDate}
                                onChange={(date) =>
                                    this.handleDateChange(fromDateFilter.name, { ...fromDateFilter, value: date })
                                }
                            />
                            <DatePicker
                                label="To"
                                selected={toDate}
                                onChange={(date) =>
                                    this.handleDateChange(toDateFilter.name, { ...toDateFilter, value: date })
                                }
                            />
                        </FlexRow>
                    </ModalDialogSimple>
                )}
            </div>
        );
    }
}

DocumentFilterTimePeriod.propTyes = {
    onConfirm: PropTypes.func.isRequired,
    fromDateFilter: filterPropType,
    toDateFilter: filterPropType,
    activeFilters: filterArrayPropType,

    buttonText: PropTypes.string,
    modalTitle: PropTypes.string,
};
