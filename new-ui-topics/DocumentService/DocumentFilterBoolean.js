import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { filterPropType } from './documentFilterObjects';

import Button from '../../Button';
import PlusIconStroke from '../../icons/PlusIconStroke';

export default class DocumentFilterBoolean extends Component {
    render() {
        let { option, buttonText, selectedFilter, onConfirm } = this.props;
        let buttonDisabled = selectedFilter[0] && selectedFilter[0].value === true ? true : false;
        console.log('selectedFilter');
        console.log(selectedFilter);
        return (
            <div>
                <Button
                    size="small-round"
                    disabled={buttonDisabled}
                    onClick={() => {
                        onConfirm([
                            {
                                ...option,
                                value: true,
                            },
                        ]);
                    }}
                >
                    {buttonText} <PlusIconStroke size="inline" color="current-color" strokeWidth="midi" />
                </Button>
            </div>
        );
    }
}

DocumentFilterBoolean.propTyes = {
    option: filterPropType.isRequired,
    selectedFilter: filterPropType.isRequired,
    onConfirm: PropTypes.func.isRequired,

    buttonText: PropTypes.string,
};
