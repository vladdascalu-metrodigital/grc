import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './sales.scss';
import './data-table.scss';
import Panel from '../Panel';
import {lookup} from '../Util/translations.js';
import {Accordion, Collapsible} from '../Accordion';
import CustomerTrigger from '../CustomerTrigger/presentation';
  
 export const excludeUndefined = (val) => {
        if (val===undefined || val==='NaN')return 0;
        else return val;
    };

    export const sumTemp = (mdwData) =>{
        let sum={};
        sum.l1={};
        sum.l3={};
        sum.l6={};
        sum.l12={};
        mdwData.map(mdwCustomer => {
            sum.l1.purchases=excludeUndefined(sum.l1.purchases)+mdwCustomer.customerCreditData.numPurchasesL1m;
            sum.l1.invoice=excludeUndefined(sum.l1.invoice)+mdwCustomer.customerCreditData.numInvoicesL1m;
            sum.l1.turnover=excludeUndefined(sum.l1.turnover)+mdwCustomer.customerCreditData.sellValNspL1m;

            sum.l3.purchases=excludeUndefined(sum.l3.purchases)+mdwCustomer.customerCreditData.numPurchasesL3m;
            sum.l3.invoice=excludeUndefined(sum.l3.invoice)+mdwCustomer.customerCreditData.numInvoicesL3m;
            sum.l3.turnover=excludeUndefined(sum.l3.turnover)+mdwCustomer.customerCreditData.sellValNspL3m;
   
            sum.l6.purchases=excludeUndefined(sum.l6.purchases)+mdwCustomer.customerCreditData.numPurchasesL6m;
            sum.l6.invoice=excludeUndefined(sum.l6.invoice)+mdwCustomer.customerCreditData.numInvoicesL6m;
            sum.l6.turnover=excludeUndefined(sum.l6.turnover)+mdwCustomer.customerCreditData.sellValNspL6m;
   
            sum.l12.purchases=excludeUndefined(sum.l12.purchases)+mdwCustomer.customerCreditData.numPurchasesL12m;
            sum.l12.invoice=excludeUndefined(sum.l12.invoice)+mdwCustomer.customerCreditData.numInvoicesL12m;
            sum.l12.turnover=excludeUndefined(sum.l12.turnover)+mdwCustomer.customerCreditData.sellValNspL12m;
   
        });
        return sum;
    };