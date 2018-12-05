import React, { Component } from 'react';
import './SelectForm.css';

export default class SelectForm extends Component {
    render() {
        const { value, onChange, children } = this.props;

        return (
            <select
                value={value}
                onChange={onChange}
            >
                {children}
            </select>
        );
    }
}