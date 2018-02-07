import React, {Component} from 'react';

export class NumberInput extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.initialValue ? props.initialValue + '' : ''};
        if (props.value) {
            console.log('NumberInput should not be passed a value prop (will be ignored)');
        }
    }

    parse(str) {
        return (/^[0-9]+$/.test(str))
            ? Number(str)
            : NaN;
    }

    handleChange = (event) => {
        const str = event.target.value;
        const parsed = this.parse(str);
        if (str.length === 0) {
            this.setState({value: str});
            this.props.onChange(null);
        } else if (!Number.isNaN(parsed)) {
            this.setState({value: str});
            this.props.onChange(parsed);
        }
    };

    render() {
        const inputProps = {...this.props};
        delete inputProps.value;
        delete inputProps.onChange;
        delete inputProps.initialValue;
        return (
            <input type='text'
                   value={this.state.value}
                   onChange={this.handleChange}
                   {...inputProps}/>);
    }
}
