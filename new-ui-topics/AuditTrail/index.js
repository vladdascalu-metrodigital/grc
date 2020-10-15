import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import '../EmailService/MrcUiBasicGridTable.scss';
import classnames from 'classnames';
import ColleaguesModalDialog from './ColleaguesModalDialog';
import ActivationResultsModalDialog from './ActivationResultsModalDialog';

export default class AuditTrail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showColleaguesModal: null,
            showActivationResultsModal: null,
        };
    }

    render() {
        let { trail, section, colleaguesWithRoles, activationResults } = this.props;
        let { showActivationResultsModal, showColleaguesModal } = this.state;
        return (
            <div className="mrc-ui-audit-trail">
                <table className="mrc-ui-basic-grid-table" style={{ '--mrc-ui-grid-template-columns': '1fr 1fr 2rem' }}>
                    <tbody>
                        {section.map((section, k) => {
                            return (
                                <React.Fragment key={k}>
                                    <tr className="mrc-ui-basic-grid-table-header">
                                        <th>
                                            <span>{section}</span>
                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    {trail[section].map((sectionTrail, key) => {
                                        let discClassName = classnames('mrc-ui-audit-trail-status-disc', {
                                            'mrc-ui-audit-trail-status-disc-green': sectionTrail.status === 'approved',
                                            'mrc-ui-audit-trail-status-disc-red': sectionTrail.status === 'rejected',
                                        });

                                        let stateClassName = classnames('mrc-ui-audit-trail-status-state', {
                                            'mrc-ui-audit-trail-status-state-green': sectionTrail.status === 'approved',
                                            'mrc-ui-audit-trail-status-state-red': sectionTrail.status === 'rejected',
                                        });

                                        var subTitle;

                                        if (
                                            sectionTrail.status === 'approved' &&
                                            sectionTrail.roleId === 'mrc-system'
                                        ) {
                                            subTitle = (
                                                <div className="mrc-ui-audit-trail-user-name">
                                                    <a
                                                        onClick={() =>
                                                            this.setState({
                                                                showActivationResultsModal: activationResults,
                                                            })
                                                        }
                                                        className="mrc-ui-audit-trail-user-name-link"
                                                    >
                                                        Show Activation Results
                                                    </a>
                                                </div>
                                            );
                                        } else if (
                                            sectionTrail.status === 'pending' &&
                                            sectionTrail.roleId !== 'mrc-system'
                                        ) {
                                            subTitle = (
                                                <div className="mrc-ui-audit-trail-user-name">
                                                    <a
                                                        onClick={() =>
                                                            this.setState({
                                                                showColleaguesModal:
                                                                    colleaguesWithRoles[sectionTrail.roleId],
                                                            })
                                                        }
                                                        className="mrc-ui-audit-trail-user-name-link"
                                                    >
                                                        Show Colleagues
                                                    </a>
                                                </div>
                                            );
                                        } else if (sectionTrail.status !== 'pending') {
                                            subTitle = (
                                                <div className="mrc-ui-audit-trail-user-name">{sectionTrail.user}</div>
                                            );
                                        }

                                        return (
                                            <tr key={key}>
                                                <td>
                                                    <div>
                                                        <div className="mrc-ui-audit-trail-user-email">
                                                            {sectionTrail.role}
                                                        </div>
                                                        {subTitle}
                                                    </div>
                                                </td>
                                                <td className="mrc-ui-grid-table-cell-align-right">
                                                    <div className="mrc-ui-audit-trail-status">
                                                        <div className={stateClassName}>{sectionTrail.status}</div>
                                                        <div className="mrc-ui-audit-trail-status-date">
                                                            {sectionTrail.timestamp}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={discClassName}></div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                {showColleaguesModal && (
                    <ColleaguesModalDialog
                        onCancel={() => this.setState({ showColleaguesModal: null })}
                        onOk={() => this.setState({ showColleaguesModal: null })}
                        colleagues={showColleaguesModal}
                    />
                )}

                {showActivationResultsModal && (
                    <ActivationResultsModalDialog
                        onCancel={() => this.setState({ showActivationResultsModal: false })}
                        onOk={() => this.setState({ showActivationResultsModal: false })}
                        activationResults={showActivationResultsModal}
                    />
                )}
            </div>
        );
    }
}

AuditTrail.propTypes = {
    // trail: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         user: PropTypes.string,
    //         role: PropTypes.string,
    //         roleId: PropTypes.string,
    //         status: PropTypes.string,
    //         timestamp: PropTypes.string,
    //     })
    // ),
    trail: PropTypes.object,
    colleaguesWithRoles: PropTypes.object,
    activationResults: PropTypes.array,
    section: PropTypes.array,
};

// AuditTrail.defaultProps = {
//     trail: [],
// };
