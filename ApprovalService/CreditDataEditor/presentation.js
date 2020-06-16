import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { NumberInput } from '../../NumberInput/index';
import { lookup } from '../../Util/translations';
import EditIcon from '../../icons/edit.svg';
import ChevronDownIcon from '../../icons/chevron-down.svg';

export default class CreditDataEditor extends Component {
    PLACEHOLDER = '-';

    createFormField() {
        let approved = this.props.approved[this.props.name];
        const attrs = {
            name: this.props.name,
            className: 'mrc-input m-input-element extra-class-on-input-tag requested',
            value: this.props.approved ? approved : this.PLACEHOLDER,
            required: true,
            onChange: this.handleFormFieldChanged,
            disabled:
                (this.props.type === 'select' && this.props.children && this.props.children.length === 1) ||
                this.props.readOnly,
        };
        const numberAttrs = { ...attrs };
        if (this.props.onBlur) {
            numberAttrs.onBlur = this.props.onBlur;
        }
        delete numberAttrs.value;
        switch (this.props.type) {
            case 'number':
                return <NumberInput id={this.props.inputId} {...numberAttrs} initialValue={attrs.value} />;
            case 'select':
                return (
                    <select
                        id={this.props.inputId}
                        {...attrs}
                        value={
                            attrs.value == null
                                ? ''
                                : attrs.value.includes('mrc.payment.')
                                ? attrs.value
                                : 'mrc.payment.' + attrs.value.split(' ').join('_')
                        }
                    >
                        {this.props.children}
                    </select>
                );
            default:
                console.error('Could not render form field of type ' + this.props.type);
        }
    }

    handleFormFieldChanged = event => {
        if (this.props.onChange) this.props.onChange(event);
    };

    createDisplayText = (value, country) => {
        switch (this.props.name) {
            case 'amount':
                if (value || value === 0) return <mrc-number show-currency-for-country={country}> {value}</mrc-number>;
                else return this.PLACEHOLDER;
            default:
                if (value)
                    return lookup(value.includes('mrc.payment.') ? value : 'mrc.payment.' + value.split(' ').join('_'));
                else return this.PLACEHOLDER;
        }
    };

    render() {
        const current = this.props.current[this.props.name];
        const labelImg =
            this.props.type === 'number' ? (
                <img className="mrc-icon-small" src={EditIcon} />
            ) : (
                <img className="mrc-icon-small" src={ChevronDownIcon} />
            );
        //        const requested = this.props.requested[this.props.name];
        //        <input type='text' id='id1' name='name' placeholder='' value='' className='m-input-element extra-class-on-input-tag' aria-readonly='false' aria-required='false' />
        return (
            <div className={'mrc-credit-data-editor mrc-input ' + this.props.name}>
                <div className="mrc-input-header">
                    <h4 className="span-metro-blue">{this.props.label}</h4>
                    <ul className="col-end">
                        <li>
                            <small className="current">
                                {lookup('mrc.creditdetails.current')}:{' '}
                                {this.createDisplayText(current, this.props.country)}
                            </small>
                        </li>
                    </ul>
                </div>
                <div className="m-input m-input-name credit-data-input">
                    <div className="m-label">
                        <label htmlFor={this.props.inputId}>{lookup('mrc.creditdetails.requested')}</label>
                    </div>
                    <div className="m-input-elementWrapper">
                        <label htmlFor={this.props.inputId} className="m-input-iconLink">
                            {labelImg}
                        </label>
                        {this.createFormField()}
                        <span className="m-input-errorMessage" />
                    </div>
                </div>
            </div>
        );
    }
}

CreditDataEditor.propTypes = {
    current: PropTypes.object.isRequired,
    requested: PropTypes.object.isRequired,
    approved: PropTypes.object,
    children: PropTypes.any,
    onChange: PropTypes.func,
    inputId: PropTypes.string,
    label: PropTypes.string.isRequired,
    country: PropTypes.string,
    type: PropTypes.oneOf(['number', 'select']),
    name: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    onBlur: PropTypes.func,
};
