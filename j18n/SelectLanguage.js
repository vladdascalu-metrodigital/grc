import React, {Component} from 'react';
// import './index.scss';

import loader from '../../global/j18n/loader';

export default class SelectLanguage extends Component {


    constructor(props) {
        super(props);
    }

    changeLanguage = (event) => {
        loader.language = event.target.value;
    };

    render() {
        return <span {...this.props}>
            <select
                onChange={this.changeLanguage}
                value={loader.language}
            >
                {loader.languages.map( (l) => <option key={l} value={l}>{l}</option> )}
            </select>
        </span>;
    }
}
