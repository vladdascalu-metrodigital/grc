import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './sales.scss';
import './data-table.scss';
import Panel from '../Panel';
import {lookup} from '../Util/translations.js';
import {Accordion, Collapsible} from '../Accordion';
import CustomerTrigger from '../CustomerTrigger/presentation';

//comment just to test
export default class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = {mdwData: null};
    }

    componentDidMount() {
        this.props.getMdwData().then(result => {
            this.setState({mdwData: result});
        });
    }

    createOneSalesView(mdwCustomer) {
        return (<Panel title='Sales'>
                <div className="mrc-scoring-data">
                    <div className="mrc-data-table">
                        <div className="table-header">
                            <p className="metro-blue">{lookup('mrc.mdw.salesoverview')}</p>
                        </div>
                        <div className="data-table-wrapper">
                            <div className="col-scroll">
                                <table className='mdw-data-table'>
                                    <tbody>
                                    <tr className="emphazised">
                                        <th className="row-title"></th>
                                        <td className="col-1">L1M</td>
                                        <td className="col-2">L3M</td>
                                        <td className="col-3">L6M</td>
                                        <td className="col-4">L12M</td>
                                    </tr>
                                    <tr>
                                        <th className="row-title">{lookup('mrc.mdw.numberofpurchase')}</th>
                                        <td className="col-1">{mdwCustomer.customerCreditData.numPurchasesL1m}</td>
                                        <td className="col-2">{mdwCustomer.customerCreditData.numPurchasesL3m}</td>
                                        <td className="col-3">{mdwCustomer.customerCreditData.numPurchasesL6m}</td>
                                        <td className="col-4">{mdwCustomer.customerCreditData.numPurchasesL12m}</td>
                                    </tr>
                                    <tr>
                                        <th className="row-title">{lookup('mrc.mdw.numberofinvoices')}</th>
                                        <td className="col-1">{mdwCustomer.customerCreditData.numInvoicesL1m}</td>
                                        <td className="col-2">{mdwCustomer.customerCreditData.numInvoicesL3m}</td>
                                        <td className="col-3">{mdwCustomer.customerCreditData.numInvoicesL6m}</td>
                                        <td className="col-4">{mdwCustomer.customerCreditData.numInvoicesL12m}</td>
                                    </tr>
                                    <tr className="emphazised break">
                                        <th className="row-title">{lookup('mrc.mdw.totalturnover')}</th>
                                        <td className="col-1">{mdwCustomer.customerCreditData.sellValNspL1m}</td>
                                        <td className="col-2">{mdwCustomer.customerCreditData.sellValNspL3m}</td>
                                        <td className="col-3">{mdwCustomer.customerCreditData.sellValNspL6m}</td>
                                        <td className="col-4">{mdwCustomer.customerCreditData.sellValNspL12m}</td>
                                    </tr>

                                    <tr>
                                        <th className="row-title break"></th>
                                    </tr>
                                    <tr className="emphazised">
                                        <th className="row-title">{lookup('mrc.mdw.merchandisegroupturnover')}</th>
                                        <td className="col-1">L1M</td>
                                        <td className="col-2">L3M</td>
                                        <td className="col-3">L6M</td>
                                        <td className="col-4">L12M</td>
                                    </tr>

                                    {mdwCustomer.behaviourDataList.map(this.createRow)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="edge-line"></div>
            </Panel>

        );
    }

    render() {
        if(this.props.createdFrom == 'creditlimit') { return null; }
        if (this.state.mdwData == null || this.state.mdwData.length == 0) {
            return <h4 className='not-found'>{lookup('mrc.mdw.nodataavailable')}</h4>;
        }
        //For group 
        const collapsibles = this.state.mdwData.map(mdwCustomer => {
            const key = mdwCustomer.customerCreditData.storeNumber + '/' + mdwCustomer.customerCreditData.customerNumber;
            const trigger = <CustomerTrigger
                customer={mdwCustomer.customer}
                current={mdwCustomer.currentCreditData ? mdwCustomer.currentCreditData.amount : null}
                requested={mdwCustomer.requestedCreditData ? mdwCustomer.requestedCreditData.amount : null}
            />;
            return <Collapsible open={true}
                                key={key}
                                trigger={trigger}>
                {this.createOneSalesView(mdwCustomer)}
            </Collapsible>;
        });


        //End for group

        return <Accordion className='mrc-sales-accordion'>
            {collapsibles}
        </Accordion>;
    }

    createRow = (item) => {
        return (
            <tr key={item.behaviouralCode}>
                <th className="row-title">{lookup('mrc.mdw.behaviour-' + item.behaviouralCode + '-' + item.country)}</th>
                <td className="col-1">{item.behvSellValNspL1m}</td>
                <td className="col-2">{item.behvSellValNspL3m}</td>
                <td className="col-3">{item.behvSellValNspL6m}</td>
                <td className="col-4">{item.behvSellValNspL12m}</td>
            </tr>
        );
    };

}


Sales.propTypes = {
    limitRequestId: PropTypes.string,
    getMdwData: PropTypes.func,
    createdFrom: PropTypes.string
};

