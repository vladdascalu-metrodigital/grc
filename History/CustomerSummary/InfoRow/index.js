import './index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InfoRow extends Component {
    render() {
        return (
            <section className="mrc-info-row">
                <div className="infos">
                    <h2>{this.props.data}</h2>
                </div>
            </section>
        );
    }
}

InfoRow.propTypes = {
    data: PropTypes.string,
};
