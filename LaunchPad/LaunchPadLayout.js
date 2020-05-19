import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import PropTypes from 'prop-types';
import { createUriPath } from '../Util/util.js';
import { lookup } from '../Util/translations.js';
import VideoPlayer from './VideoPlayer';
import LimitcheckIcon from '../icons/credit-request-blue.svg';
import HistoryIcon from '../icons/history-blue.svg';
import InboxIcon from '../icons/inbox-blue.svg';
import QuickcheckIcon from '../icons/quick-check-blue.svg';
import CreditcorrectionIcon from '../icons/credit-correction-blue.svg';
import BatchUpdateIcon from '../icons/batch-update-blue.svg';
import FileIcon from '../icons/file.svg';

const trainingMovieStyle = {
    margin: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(550px, 1fr))',
    gridGap: '.5rem',
};

const iconMap = {
    limitcheck: LimitcheckIcon,
    history: HistoryIcon,
    inbox: InboxIcon,
    quickcheck: QuickcheckIcon,
    creditcorrection: CreditcorrectionIcon,
    batchupdate: BatchUpdateIcon,
    // TODO change to real icon
    reports: FileIcon,
};

export default class LaunchPadLayout extends Component {
    constructor(props) {
        super(props);
        this.createTile = this.createTile.bind(this);
        this.createTrainingMovie = this.createTrainingMovie.bind(this);
    }

    componentDidMount() {
        this.setState(() => {
            this.props.showAuxControl({ back: false });
            this.props.updateUiPageTitle(lookup('mrc.apps.launchpad'));
        });
    }

    createTile(tile) {
        const { updateActiveItem } = this.props;
        const appName = tile.roleKey;
        const href = LaunchPadLayout.createTileHref(tile.template, appName);
        const isAbsolute = href.startsWith('http');
        const icon = iconMap[appName.toLowerCase()];
        const tileContent = (
            <label htmlFor={href}>
                <img className="mrc-icon-large" src={icon} alt={lookup(tile.title)} />
                <h2 className="span-metro-blue">{lookup(tile.title)}</h2>
            </label>
        );
        return isAbsolute ? (
            <a onClick={updateActiveItem.bind(this, appName)} href={href} key={href} className="mrc-tile">
                {tileContent}
            </a>
        ) : (
            <Link onClick={updateActiveItem.bind(this, appName)} to={href} key={href} className="mrc-tile">
                {tileContent}
            </Link>
        );
    }

    createTrainingMovie(trainingMovieConfig, width) {
        if (!trainingMovieConfig.available) {
            return null;
        }

        return (
            <div className="mrc-square">
                <VideoPlayer width={width} src={trainingMovieConfig.url} />
            </div>
        );
    }

    static createTileHref(template, roleKey) {
        return template.indexOf('{') < 0 ? template : createUriPath('search', roleKey, template);
    }

    render() {
        const config = this.props.config.data;
        if (!config) {
            return null;
        }
        let trainingMovieDesktop =
            config.trainingMovie !== undefined ? this.createTrainingMovie(config.trainingMovie, '550px') : null;
        let tiles = config.launchpad.tiles.map(this.createTile);
        if (!tiles.length) {
            tiles = <span className="no-tiles-placeholder">{lookup('mrc.launchpad.access-denied')}</span>;
        }
        // TODO Improve complicated nesting in component lib!
        if (this.props.tablet || this.props.desktop) {
            return (
                <div>
                    <div className="mrc-tile-group">{tiles}</div>
                    <div style={trainingMovieStyle}>{trainingMovieDesktop}</div>
                </div>
            );
        } else {
            let trainingMovieMobile =
                config.trainingMovie !== undefined ? this.createTrainingMovie(config.trainingMovie, '100%') : null;
            return (
                <div className="mrc-launchpad">
                    <div className="tiles-menu">
                        {tiles}
                        {trainingMovieMobile}
                    </div>
                </div>
            );
        }
    }
}

LaunchPadLayout.propTypes = {
    updateUiPageTitle: PropTypes.func.isRequired,
    updateActiveItem: PropTypes.func.isRequired,
    showAuxControl: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
};
