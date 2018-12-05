import React, { Component } from 'react';
import './InputForm.css';

export default class InputForm extends Component {
    render() {
        const { value, onChange, type, children } = this.props;

        return (
            <input
                type={type}
                value={value}
                onChange={onChange}
            >
                {children}
            </input>
        );
    }
}