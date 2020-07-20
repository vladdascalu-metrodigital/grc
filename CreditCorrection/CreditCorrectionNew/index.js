import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/index';
import ProgressBar from '../../ProgressBar';
import Comments from '../../Comments';
import Attachments from '../../Attachments';
import { Route, Switch } from 'react-router-dom';
import { Tab, TabList, Tabs } from 'react-tabs';
import ErrorHandledTabPanel from '../../ErrorHandledTabPanel';
import '../../tabs.scss';
import { Accordion, Collapsible } from '../../Accordion';
import RequestSubmitted from './RequestSubmitted';
import { lookup } from '../../Util/translations';
import './index.scss';
import MrcSpinner from '../../Util/MrcSpinner';
import CreditDataTabNew from './CreditDataTabNew';

import CustomerDataGroup from '../../CustomerDataGroup';

export default class CreditCorrectionLayout extends Component {
    FILE_TYPES = [''];

    constructor(props) {
        super(props);
        // this.handleRequestedLimitChange = this.handleRequestedLimitChange.bind(this);
        this.state = {
            creditDataValid: false,
            canceled: false,
            enableSpinner: false,
            newComment: '',
        };
        this.addNewComment = this.addNewComment.bind(this);
        this.handleNewCommentChange = this.handleNewCommentChange.bind(this);
        this.onCreditDataValidChange = this.onCreditDataValidChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.props.showAuxControl({ back: true });
        this.props.loadRequest(this.props.match.params.id);
        this.props.updateUiPageTitle(lookup('creditcorrection.limitrequest.title'));
    }

    componentWillUnmount() {
        this.props.cleanup();
    }

    componentDidUpdate(prevState) {
        if (prevState.enableSpinner) {
            this.setState({ enableSpinner: false });
        }
    }

    onCreditDataValidChange(creditDataValid) {
        this.setState({
            creditDataValid: creditDataValid,
        });
    }

    createProgressBar() {
        const request = this.props.request.data;
        if (request) {
            return <ProgressBar name={lookup('mrc.phase.initialization')} step={1} totalSteps={3} />;
        } else {
            return null;
        }
    }

    createButtons() {
        const creditCorrectionRequest = this.props.request.data;
        var disabled = true;
        if (creditCorrectionRequest != null) {
            const notNullActivations = creditCorrectionRequest.requestedItems.filter((ri) => ri.activationInfo != null);
            if (notNullActivations.length === 0) {
                disabled = false;
            } else {
                const unsuccessfullActivations = notNullActivations.filter(
                    (a) => a.activationInfo.resultCode !== '0' && a.activationInfo.resultCode !== '-1'
                );
                if (unsuccessfullActivations.length !== 0) {
                    disabled = false;
                }
            }
        }
        return (
            /*
            <SimpleActionDock
                onCancel={() => {
                    this.setState({ ...this.state, canceled: true, enableSpinner: true });
                    this.props.cancel(creditCorrectionRequest.id);
                }}
                onApply={() => {
                    this.setState({ enableSpinner: true });
                    this.props.submitRequest(creditCorrectionRequest.id, 'APPROVED');
                }}
                applyDisabled={
                    !(this.state.creditDataValid && !this.state.canceled) ||
                    disabled ||
                    this.props.request.data.requestsDisabled
                }
                cancelDisabled={disabled || this.state.canceled}
            />
            */
            <div className="mrc-btn-group">
                {
                    <Button
                        text={lookup('creditcorrection.cancel')}
                        id="mrc-cancel-button"
                        status="secondary"
                        disabled={disabled || this.state.canceled}
                        onClick={() => {
                            this.setState({ ...this.state, canceled: true, enableSpinner: true });
                            this.props.cancel(creditCorrectionRequest.id);
                        }}
                    />
                }
                <Button
                    text={lookup('creditcorrection.applychanges')}
                    id="mrc-applychanges-button"
                    status={!(this.state.creditDataValid && !this.state.canceled) || disabled ? 'secondary' : 'success'}
                    disabled={
                        !(this.state.creditDataValid && !this.state.canceled) ||
                        disabled ||
                        this.props.request.data.requestsDisabled
                    }
                    onClick={() => {
                        this.setState({ enableSpinner: true });
                        this.props.submitRequest(creditCorrectionRequest.id, 'APPROVED');
                    }}
                />
            </div>
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (!(this.state && this.state.creditDataValid)) {
            console.warn('Form is not valid, abort submit.');
            return;
        }
        this.props.submitRequest(this.props.request.data.id);
    }

    createCustomerDetailsPanel(req) {
        // in case there is some data, retrieve list of customers from list of requestedItems
        const customers = req.data && req.data.requestedItems.map((ri) => ri.customer);

        return <CustomerDataGroup customers={customers} />;
    }

    handleNewCommentChange(text) {
        this.setState({ newComment: text === undefined || text === null ? '' : text });
    }

    addNewComment = () => {
        if (!this.props.request.data) return;

        const creditCorrectionRequest = this.props.request.data;
        const comment = this.state.newComment;
        this.setState({ newComment: '' });
        if (comment.trim().length > 0) {
            this.props.addComment(creditCorrectionRequest.id, comment);
        }
    };

    createCommentsPanel() {
        if (!this.props.request.data) return null;
        const creditCorrectionRequest = this.props.request.data;
        return (
            <Comments
                ready={this.props.request.data && !this.props.request.loading}
                newComment={this.state.newComment}
                data={creditCorrectionRequest.comments}
                addComment={this.addNewComment}
                handleNewCommentChange={this.handleNewCommentChange}
                addCommentTitle={lookup('mrc.comments.addcomment')}
            />
        );
    }

    createAttachmentsPanel() {
        const creditCorrectionRequest = this.props.request.data || {};
        if (creditCorrectionRequest.fileTypes) this.FILE_TYPES = creditCorrectionRequest.fileTypes;

        const activated = creditCorrectionRequest.activated !== undefined ? creditCorrectionRequest.activated : false;
        const disabled = this.state.canceled || activated;
        const attachments = creditCorrectionRequest.attachments;

        return (
            <Attachments
                noDeletedAttachmentsToggle={true}
                noPlaceholder={true}
                attachments={(attachments ? attachments : []).map((a) => {
                    return a.deleted
                        ? /* eslint-disable */
                          // restore is not used for credit correction at the
                          // moment. Left in for possible future use
                          {
                              ...a,
                              status: 'deleted',
                              secondaryInteraction: disabled ? null : 'restore',
                              handleSecondaryAction: () =>
                                  this.props.restoreAttachment(creditCorrectionRequest.id, a.id),
                          }
                        : {
                              ...a,
                              status: 'normal',
                              secondaryInteraction: disabled ? null : 'delete',
                              handleSecondaryAction: () =>
                                  this.props.deleteAttachment(creditCorrectionRequest.id, a.id),
                          };
                    /* eslint-enable */
                })}
                addAttachment={(fileType, file, title) =>
                    this.props.addAttachment(fileType, creditCorrectionRequest.id, file, title)
                }
                readonly={disabled}
                disabled={disabled}
                fileTypes={this.FILE_TYPES}
                country={
                    creditCorrectionRequest && creditCorrectionRequest.requestedCustomerId
                        ? creditCorrectionRequest.requestedCustomerId.country.toLowerCase()
                        : null
                }
            />
        );
    }

    render() {
        const req = this.props.request;
        if (
            this.state.enableSpinner &&
            (this.props.request.loading || !this.props.request.data || !this.props.request.data.requestedItems)
        ) {
            return <MrcSpinner></MrcSpinner>;
        }
        if (
            !this.state.enableSpinner &&
            this.props.request.loading &&
            (!this.props.request.data || !this.props.request.data.requestedItems)
        ) {
            return <MrcSpinner></MrcSpinner>;
        }
        if (!this.state.enableSpinner && (!this.props.request.data || !this.props.request.data.requestedItems)) {
            return <MrcSpinner></MrcSpinner>;
        }
        return (
            <Switch>
                <Route
                    path="*/submitted"
                    render={() => {
                        return <RequestSubmitted data={this.props.request.data} />;
                    }}
                />

                <Route
                    path="*"
                    render={() => (
                        <form method="POST" className="mrc-limit-request" onSubmit={this.handleFormSubmit.bind(this)}>
                            {this.createProgressBar()}
                            {this.props.isTablet ? (
                                <Tabs forceRenderTabPanel={true}>
                                    <TabList>
                                        <Tab>{lookup('mrc.creditdetails.title')}</Tab>
                                        <Tab>{lookup('mrc.customerdetails.title')}</Tab>
                                        <Tab>{lookup('mrc.comments.title')}</Tab>
                                        <Tab>{lookup('mrc.attachments.title')}</Tab>
                                    </TabList>
                                    <ErrorHandledTabPanel>
                                        <CreditDataTabNew
                                            request={this.props.request}
                                            onCreditDataValidChange={this.onCreditDataValidChange}
                                            setCreditData={this.props.setCreditData}
                                        />
                                    </ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createCustomerDetailsPanel(req)}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createCommentsPanel()}</ErrorHandledTabPanel>
                                    <ErrorHandledTabPanel>{this.createAttachmentsPanel()}</ErrorHandledTabPanel>
                                </Tabs>
                            ) : (
                                <Accordion>
                                    <Collapsible trigger={lookup('mrc.creditdetails.title')}>
                                        <CreditDataTabNew
                                            request={this.props.request}
                                            onCreditDataValidChange={this.onCreditDataValidChange}
                                            setCreditData={this.props.setCreditData}
                                        />
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.customerdetails.title')}>
                                        {this.createCustomerDetailsPanel(req)}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.comments.title')}>
                                        {this.createCommentsPanel()}
                                    </Collapsible>
                                    <Collapsible trigger={lookup('mrc.attachments.title')}>
                                        {this.createAttachmentsPanel()}
                                    </Collapsible>
                                </Accordion>
                            )}
                            {this.createButtons()}
                        </form>
                    )}
                />
            </Switch>
        );
    }
}

CreditCorrectionLayout.propTypes = {
    cleanup: PropTypes.func.isRequired,
    updateUiPageTitle: PropTypes.func.isRequired,
    showAuxControl: PropTypes.func.isRequired,
    loadRequest: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    isTablet: PropTypes.bool,
    request: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    addAttachment: PropTypes.func.isRequired,
    restoreAttachment: PropTypes.func.isRequired,
    deleteAttachment: PropTypes.func.isRequired,
    setCreditData: PropTypes.func.isRequired,
    submitRequest: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    history: PropTypes.object,
};
