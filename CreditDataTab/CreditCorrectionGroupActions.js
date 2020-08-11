import React, { Component } from 'react';

import Grid from '../Grid';
import FormSection from '../FormSection';
import CheckCard from '../CheckCard';

import './CreditCorrectionGroupActions.scss';
import { lookup } from '../Util/translations';
import * as _ from 'lodash';

export default class CreditCorrectionGroupActions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            groupActions,
            activated,
            selectedGroupAction,
            onChange,
            customers,
            disabled,
            canCorrect,
            canBlock,
            translations,
        } = this.props;
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
                            onClick={() => {
                                if (selectedGroupAction !== 'NONE') {
                                    onChange('NONE');
                                }
                            }}
                            disabled={
                                disabled ||
                                (activated === true && selectedGroupAction !== 'NONE') ||
                                (!canBlock && !canCorrect)
                            }
                        />
                        {isAllCashCustomerGroup || _.isNil(groupActions)
                            ? null
                            : Object.values(groupActions).map((ga, i) => (
                                  <CheckCard
                                      key={i + 1}
                                      title={lookup(ga.translationKey)}
                                      checked={selectedGroupAction === ga.id}
                                      onClick={() => {
                                          if (selectedGroupAction !== ga.id) {
                                              onChange(ga.id);
                                          }
                                      }}
                                      disabled={
                                          disabled || (activated === true && selectedGroupAction !== ga.id) || !canBlock
                                      }
                                  />
                              ))}
                    </Grid>
                </FormSection>
            </div>
        );
    }
}
