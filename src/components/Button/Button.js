import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Button.css';

export default class ButtonForm extends Component {

    render() {
        const { className,  onClick, children } = this.props;

        return (
            <Button className={className} onClick={onClick} >
                {children}
            </Button>
        );
    }
}