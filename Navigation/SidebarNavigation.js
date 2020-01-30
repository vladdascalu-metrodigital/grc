import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './sidebar.scss';
import PropTypes from 'prop-types';
import {createNav, extractNavsFromQuickNav} from '../Util/nav';

export default class SidebarNavigation extends Component {

    createNavWithWrapper = (btnConf) => {
        return <li key={btnConf.roleKey}>{this.createNavElement(btnConf)}</li>;
    };

    createNavElement(btnConf) {
        const conf = createNav(btnConf, this.props.config.data.translations);
        if(conf.isAbsolute) {
            return <a href={conf.href}>{conf.imgEl}</a>;
        } else {
            return <Link to={conf.href}>{conf.imgEl}</Link>;
        }
    }

    render() {
        return (
            <div className='primary-actions'>
                <ul>
                    {extractNavsFromQuickNav(this.props.config.data.quickNav).map(this.createNavWithWrapper, this)}
                </ul>
            </div>
        );
    }

}

SidebarNavigation.propTypes = {
    config: PropTypes.object.isRequired
};
