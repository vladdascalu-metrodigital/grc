import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './sidebar.scss';
import PropTypes from 'prop-types';
import SelectLanguage from '../i18n';
import {createNav, extractNavsFromQuickNav} from '../Util/nav';

export default class SidebarNavigation extends Component {

    createNavWithWrapper = (btnConf) => {
        return <div key={btnConf.roleKey}
                    className='action'>{this.createNavElement(btnConf)}</div>;
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
            <div>
                {extractNavsFromQuickNav(this.props.config.data.quickNav).map(this.createNavWithWrapper, this)}
                <div className='action mrc-language'><SelectLanguage/></div>
            </div>
        );
    }

}

SidebarNavigation.propTypes = {
    config: PropTypes.object.isRequired
};
