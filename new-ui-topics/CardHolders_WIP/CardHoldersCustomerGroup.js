import React, { Component } from 'react';

import Search from '../../Search';
import BoxWithTitle from '../../BoxWithTitle';
import DrillDownItem from '../../DrillDownItem';
import IconAndLabels from '../../icons/IconAndLabels';
import Toggle from '../../Toggle';
import BackButton from '../../BackButton';

import BusinessIcon from '../../icons/BusinessIcon';
import ProfileIcon from '../../icons/ProfileIcon';
import { COLOR as IC } from '../../icons';

import './CardHoldersCustomerGroup.scss';

export default class CardHoldersCustomerGroup extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="mrc-ui-cardholders-customer-group-top-row">
                    <BackButton />
                    <h2 className="text-center">Müller GmbH</h2>
                </div>
                <h3 className="pb-2">Customer Group</h3>
                <div className="mrc-ui-cardholders-customer-group">
                    <div className="mrc-ui-cardholders-customer-group-customers">
                        <div className="pa-4">
                            <h4 className="text-center pb-4">Customers</h4>
                            <Search />
                        </div>
                        <div>
                            <DrillDownItem active>
                                <IconAndLabels
                                    icon={BusinessIcon}
                                    iconColor={IC.SUCCESS}
                                    title="Müller"
                                    subtitle="123/788993"
                                />
                            </DrillDownItem>
                            <DrillDownItem>
                                <IconAndLabels
                                    icon={BusinessIcon}
                                    iconColor={IC.SUCCESS}
                                    title="Müller"
                                    subtitle="123/788993"
                                />
                            </DrillDownItem>
                            <DrillDownItem>
                                <IconAndLabels icon={BusinessIcon} title="Müller" subtitle="123/788993" />
                            </DrillDownItem>
                        </div>
                    </div>
                    <div className="mrc-ui-cardholders-customer-group-cardholders px-6">
                        <div className="pt-4 pb-6">
                            <h4 className="text-center pb-4">Cardholders</h4>
                            <Search />
                        </div>
                        <BoxWithTitle
                            title="Betterlife GmbH"
                            action={{
                                title: 'Toggle All Credit',
                                fn: () => {
                                    alert('toggle');
                                },
                            }}
                            type="smaller-alt"
                            flush
                        >
                            <div className="mrc-ui-cardholders-customer-group-cardholder">
                                <Toggle spaceBetween>
                                    <IconAndLabels icon={ProfileIcon} title="Müller" subtitle="123/788993" />
                                </Toggle>
                            </div>
                            <div className="mrc-ui-cardholders-customer-group-cardholder">
                                <Toggle spaceBetween>
                                    <IconAndLabels icon={ProfileIcon} title="Müller" subtitle="123/788993" />
                                </Toggle>
                            </div>
                        </BoxWithTitle>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
