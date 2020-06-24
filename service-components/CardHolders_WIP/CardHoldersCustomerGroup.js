import React, { Component } from 'react';

import Search from '../../Search';
import BoxWithTitle from '../../BoxWithTitle';
import DrillDownItem from '../../DrillDownItem';
import IconAndLabels from '../../icons/IconAndLabels';
import Toggle from '../../Toggle';
import BusinessIcon from '../../icons/BusinessIcon';
import ProfileIcon from '../../icons/ProfileIcon';
import { COLOR as IC } from '../../icons';

import './CardHoldersCustomerGroup.scss';

export default class CardHoldersCustomerGroup extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Customer Group</h2>
                <div className="mrc-ui-cardholders-customer-group">
                    <div className="mrc-ui-cardholders-customer-group-customers">
                        <h3>Customers</h3>
                        <Search />
                        <div>
                            <DrillDownItem>
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
                    <div className="mrc-ui-cardholders-customer-group-cardholders">
                        <h3>Cardholders</h3>
                        <Search />
                        <BoxWithTitle
                            title="Betterlife GmbH"
                            action={{
                                title: 'Toggle All Credit',
                                fn: () => {
                                    alert('toggle');
                                },
                            }}
                            type="smaller-alt"
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
