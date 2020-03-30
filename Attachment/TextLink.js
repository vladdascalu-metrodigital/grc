import React, { Component } from 'react';
import './textlink.scss';
import iconAdd from '../icons/add-attachment.svg';
import iconRestore from '../icons/restore.svg';
import iconTrash from '../icons/trash.svg';

export default class TextLink extends Component {
    constructor(props) {
        super(props);
    }

    image(iconClassName, iconFile) {
        return <img className={iconClassName} src={iconFile} alt={iconClassName} />;
    }

    render() {
        const iconClassName = 'icon-'.concat(this.props.icon);
        let icon;
        switch (this.props.icon) {
            case 'add':
                icon = this.image(iconClassName, iconAdd);
                break;
            case 'restore':
                icon = this.image(iconClassName, iconRestore);
                break;
            case 'trash':
                icon = this.image(iconClassName, iconTrash);
                break;
            default:
                icon = null;
        }

        if (this.props.click) {
            return (
                <a onClick={null} className="mrc-ui-link">
                    {icon}
                    <span>{this.props.text}</span>
                </a>
            );
        } else {
            return (
                <a href={this.props.link} className="mrc-ui-link">
                    {icon}
                    <span>{this.props.text}</span>
                </a>
            );
        }
    }
}
