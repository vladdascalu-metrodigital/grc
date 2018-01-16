import React, {Component} from 'react';
import './sidebar.scss';
import LaunchpadIcon from '../icons/launchpad.svg';
import BackBtn from './BackBtn';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SidebarNavigation extends Component {

    constructor(props) {
        super(props);
    }

    createBackBtn = () => {
        // BackBtn not removed from dom but only set to 'invisible' to make sure that the onMouseEnter event is not
        // triggered on the <ul> when the back button is clicked
        return (
            <li className={classNames({end: true, hidden: !this.props.backBtn})}>
                <BackBtn onClick={this.props.disappearFlyout}/>
            </li>
        );
    };

    render() {
        const backBtn = this.createBackBtn();
        return (
            <nav>
                <ul onMouseEnter={this.props.showFlyout}>
                    <li>
                        <a href='/' onClick={this.props.disappearFlyout}>
                            <img className='icon' src={LaunchpadIcon} alt='Launch Pad'/>
                        </a>
                    </li>
                    {backBtn}
                </ul>
            </nav>
        );
    }
}


SidebarNavigation.propTypes = {
    showFlyout: PropTypes.func.isRequired,
    disappearFlyout: PropTypes.func.isRequired,
    backBtn: PropTypes.bool.isRequired
};
