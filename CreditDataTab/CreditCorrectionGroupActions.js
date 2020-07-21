import React, { Component } from 'react';

import Grid from '../Grid';
import FormSection from '../FormSection';
import CheckCard from '../CheckCard';

import './CreditCorrectionGroupActions.scss';
import { lookup } from '../Util/translations';

export default class CreditCorrectionGroupActions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { groupActions, selectedGroupAction, onChange, customers, translations } = this.props;
        const ts = translations;
        const isAllCashCustomerGroup = Object.values(customers).every((item) => item.isCashCustomer === true);
        return (
            <div className="mrc-ui-credit-correction-group-action mb-6 mt-4 ">
                <FormSection title={ts.groupActions} description={ts.groupActionsDescription}>
                    <h4 className="mrc-ui-form-label mb-2">{ts.chooseGroupAction}</h4>
                    <Grid colMin="10rem" gap="medium">
                        <CheckCard
                            key={0}
                            title={ts.setOnCustomerLevel}
                            checked={selectedGroupAction === 'NONE'}
                            onClick={() => onChange('NONE')}
                        />
                        {isAllCashCustomerGroup
                            ? null
                            : Object.values(groupActions).map((ga, i) => (
                                  <CheckCard
                                      key={i + 1}
                                      title={lookup(ga.translationKey)}
                                      checked={selectedGroupAction === ga.id}
                                      onClick={() => onChange(ga.id)}
                                  />
                              ))}
                    </Grid>
                </FormSection>
            </div>
        );
    }
}
