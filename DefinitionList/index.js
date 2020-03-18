import { lookup } from 'global-react-components/Util/translations';

import './index.css';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as _ from 'lodash';

export default class DefinitionList extends Component {
    render() {
        const items = this.props.list.map(item => {
            if (item.description && item.term) {
                return [
                    <dt key={item.term}>{React.isValidElement(item.term) ? item.term : lookup(item.term)}</dt>,
                    <dd key={item.description}>{item.description}</dd>,
                ];
            } else {
                return [];
            }
        });
        const title = this.props.title ? <h3 className="span-metro-blue">{lookup(this.props.title)}</h3> : null;
        const className = this.props.className ? 'definition-list ' + this.props.className : 'definition-list';

        return (
            <div className={className}>
                {title}
                {!_.isEmpty(items) ? <dl>{items}</dl> : null}
            </div>
        );
    }
}

DefinitionList.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            term: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
            description: PropTypes.any,
        })
    ).isRequired,
};
