import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class Chart extends Component {

    render() {
        const { data,  dataKey } = this.props;

        return (
            <LineChart width={700} height={500} data={data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        );
    }
}