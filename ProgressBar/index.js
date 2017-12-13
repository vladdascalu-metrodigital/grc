import React, {Component} from 'react';
import './index.scss';

export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.mappings = {
            3: {
                fragmentName: 'third',
                fragments: ['beginning', 'middle', 'end']
            }
        };
    }

    createBar() {
        const mapping = this.mappings[this.props.totalSteps.toString()];
        const barFragments = [];
        for (let i = 1; i <= this.props.step; i++) {
            barFragments.push(mapping.fragments[i - 1]);
        }
        return (
            <section className='bar'>
                {barFragments.map((bf, idx)=> <div className={`${bf} ${mapping.fragmentName}`} key={idx}/>)}
            </section>);
    }

    render() {
        return (
            <div className='mrc-progress-bar'>
                <section className='details'>
                    <span className='name'>{this.props.name}</span>
                    <span className='step'>
                        <span className='current'>{this.props.step}</span>
                        <span className='total'>/{this.props.totalSteps}</span>
                    </span>
                </section>
                {this.createBar()}
            </div>
        );
    }
}