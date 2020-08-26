import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { filterArrayPropType } from './documentFilterObjects';

import CheckItem from '../../CheckItem';
import Button from '../../Button';
import PlusIconStroke from '../../icons/PlusIconStroke';
import { ModalDialogSimple } from '../../ModalDialog';

import './DocumentFilterSelection.scss';

export default class DocumentFilterSelection extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.confirmFilters = this.confirmFilters.bind(this);
        this.handleClickFilterItem = this.handleClickFilterItem.bind(this);

        this.state = {
            showModal: false,
            modalFilters: {},
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.showModal) {
            let syncedModalFilters = {};
            props.selectedFilters.forEach((sf) => (syncedModalFilters[sf.name] = sf));
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
        this.props.onConfirm(Object.values(this.state.modalFilters).filter((f) => f.value === true));
    }

    handleClickFilterItem(filterName, changedFilter) {
        this.setState({
            modalFilters: {
                ...this.state.modalFilters,
                [filterName]: changedFilter,
            },
        });
    }

    render() {
        let { showModal, modalFilters } = this.state;
        let { options, modalTitle, buttonText } = this.props;

        return (
            <div>
                <Button size="small-round" onClick={this.toggleModal}>
                    {buttonText} <PlusIconStroke size="inline" color="current-color" strokeWidth="midi" />
                </Button>
                {showModal && (
                    <ModalDialogSimple title={modalTitle} onCancel={this.toggleModal} onOk={this.confirmFilters}>
                        <div className="mrc-ui-documentfilter-selection-items">
                            {options.map((filter, k) => {
                                let checked = modalFilters[filter.name] && modalFilters[filter.name].value;
                                return (
                                    <CheckItem
                                        key={k}
                                        label={filter.displayName}
                                        checked={checked}
                                        onChange={(newCheckedState) =>
                                            this.handleClickFilterItem(filter.name, {
                                                ...filter,
                                                value: newCheckedState,
                                            })
                                        }
                                    />
                                );
                            })}
                        </div>
                    </ModalDialogSimple>
                )}
            </div>
        );
    }
}

DocumentFilterSelection.propTyes = {
    options: filterArrayPropType.isRequired,
    selectedFilters: filterArrayPropType.isRequired,
    onConfirm: PropTypes.func.isRequired,

    buttonText: PropTypes.string,
    modalTitle: PropTypes.string,
};
