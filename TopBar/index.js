import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuickNav from './QuickNav';
import BrandBar from './BrandBar';

export const showTopbar = (pathname) => '/' !== pathname;

class TopBarLayout extends Component {

    render() {
        if (this.props.tablet && this.props.title !== 'Launch Pad')
            return <QuickNav/>;
        else if (this.props.tablet)
            return null;
        else
            return <BrandBar title={this.props.title}/>;
    }
}

const TopBar = connect(mapStateToProps)(TopBarLayout);

export default TopBar;

function mapStateToProps(state) {
    return {tablet: state.ui.tablet, title: state.ui.pageTitle};
}