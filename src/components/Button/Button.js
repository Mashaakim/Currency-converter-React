import React, { Component } from 'react';
import './Button.css';

export default class ButtonForm extends Component {

    render() {
        const { className,  onClick, children } = this.props;

        return (
            <button color="white" className={className} onClick={onClick} >
                {children}
            </button>
        );
    }
}