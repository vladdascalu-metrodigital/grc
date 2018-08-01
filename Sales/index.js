import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './sales.scss';
import './data-table.scss';
import Panel from '../Panel';
import {lookup} from '../Util/translations.js';

export default class Sales extends Component {

    constructor(props) {
        super(props);
        this.state ={mdwData:null};
    }
    
    componentDidMount(){
        this.props.getMdwData().then(result => {
                this.setState({mdwData : result});
            });
    }

    render() {
        if(this.state.mdwData == null){
            return null;
        }
        return (<Panel title = 'Sales'>
                <div className="mrc-scoring-data">
        <div className="mrc-data-table">
        <div className="table-header">
            <p className="metro-blue"> Sales Overview</p>
        </div>
        <div className="data-table-wrapper">
            <div className="col-scroll">
                <table>
                    <tr className="emphazised">
                        <th className="row-title"></th>
                        <td className="col-1">L1M</td>
                        <td className="col-2">L3M</td>
                        <td className="col-3">L6M</td>
                        <td className="col-4">L12M</td>
                    </tr>
                    <tr>
                        <th className="row-title">Number of Purchases</th>
                        <td className="col-1">{this.state.mdwData[0].customerCreditData.numPurchasesL1m}</td>
                        <td className="col-2">{this.state.mdwData[0].customerCreditData.numPurchasesL3m}</td>
                        <td className="col-3">{this.state.mdwData[0].customerCreditData.numPurchasesL6m}</td>
                        <td className="col-4">{this.state.mdwData[0].customerCreditData.numPurchasesL12m}</td>
                    </tr>
                    <tr>
                        <th className="row-title">Number of Invoices</th>
                        <td className="col-1">{this.state.mdwData[0].customerCreditData.numInvoicesL1m}</td>
                        <td className="col-2">{this.state.mdwData[0].customerCreditData.numInvoicesL3m}</td>
                        <td className="col-3">{this.state.mdwData[0].customerCreditData.numInvoicesL6m}</td>
                        <td className="col-4">{this.state.mdwData[0].customerCreditData.numInvoicesL12m}</td>
                    </tr>
                    <tr className="emphazised break">
                        <th className="row-title">Total Turnover</th>
                        <td className="col-1">{this.state.mdwData[0].customerCreditData.sellValNspL1m}</td>
                        <td className="col-2">{this.state.mdwData[0].customerCreditData.sellValNspL3m}</td>
                        <td className="col-3">{this.state.mdwData[0].customerCreditData.sellValNspL6m}</td>
                        <td className="col-4">{this.state.mdwData[0].customerCreditData.sellValNspL12m}</td>
                    </tr>

                    <tr>
                        <th className="row-title break"></th>
                    </tr>
                    <tr className="emphazised">
                        <th className="row-title">Merchandise Group Turnover</th>
                        <td className="col-1">L1M</td>
                        <td className="col-2">L3M</td>
                        <td className="col-3">L6M</td>
                        <td className="col-4">L12M</td>
                    </tr>

                    {this.state.mdwData[0].behaviourDataList.map(this.createRow)}

                </table>
            </div>
        </div>
    </div>
</div>
<div className="edge-line"></div>
</Panel>

);
   

        
        
    }
    
    createRow = (item) => 
    {
        return (
        <tr key={item.id.behaviouralCode}>
        <th className="row-title">{lookup('mrc.mdw.behaviour-' + item.id.behaviouralCode + '-' + item.id.country)}</th>
            <td className="col-1">{item.behvSellValNspL1m}</td>
            <td className="col-2">{item.behvSellValNspL3m}</td>
            <td className="col-3">{item.behvSellValNspL6m}</td>
            <td className="col-4">{item.behvSellValNspL12m}</td>
        </tr>
       );
        
        
    };

}
    


Sales.propTypes = {
    limitRequestId:PropTypes.string,
    getMdwData:PropTypes.func
};

