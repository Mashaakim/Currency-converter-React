/*eslint-disable no-unused-vars*/

import React from 'react';
import axios from 'axios';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class Graph extends React.Component {
    state = {
        start_date: '2018-11-11',
        end_date: '2018-11-30',
        url: 'https://api.exchangeratesapi.io/history?start_at=2018-11-11&end_at=2018-11-30&base=RUB',
        selected_valute: 'EUR',
        valutes: [],
        data: []
        };

    componentDidMount (){
        axios.get(this.state.url)
            .then(d => {
                this.setState({
                        valutes: Object.keys(Object.values(d.data.rates)[0]),
                        data: Object.keys(d.data.rates).map(function(key) {
                            let res = d.data.rates[key];
                            Object.keys(res).map(function(k) {
                                res[k] = 1.0 / res[k];
                            });
                            res['date'] = key;
                            return res }).sort((a,b) => (a.date > b.date)),
                    })
                })
    }

    selectHandler = (event) => {
        this.setState({selected_valute: String(event.target.value)})
    };

    inputStartHandler = (event) => {
        this.setState({start_date: String(event.target.value)})
    };

    inputEndHandler = (event) => {
        this.setState({end_date: String(event.target.value)})
    };

    onClick = () => {
        this.setState({
        url: 'https://api.exchangeratesapi.io/history?start_at=' + this.state.start_date + '&end_at=' + this.state.end_date + '&base=RUB',
        });
        axios.get(this.state.url)
            .then(d => {
                this.setState({
                    valutes: Object.keys(Object.values(d.data.rates)[0]),
                    data: Object.keys(d.data.rates).map(function(key) {
                        let res = d.data.rates[key];
                        Object.keys(res).map(function(k) {
                            res[k] = 1.0 / res[k];
                        });
                        res['date'] = key;
                        return res }).sort((a,b) => (a.date > b.date)),
                })
            })

    };

    render () {
        let dataKey = this.state.selected_valute;
        let data = this.state.data;
        return (
            <div>
                <input
                    type="text"
                    value={this.state.start_date}
                    onChange={this.inputStartHandler}
                />
                <input
                    type="text"
                    value={this.state.end_date}
                    onChange={this.inputEndHandler}
                />
                <select
                    value={this.state.selected_valute}
                    onChange={this.selectHandler}
                >
                    {
                        this.state.valutes.map((item, index) => {
                            return (
                                <option key={index} >
                                    {item}
                                </option>
                            )
                        })
                    }
                </select>
                <button onClick={this.onClick} >
                    Draw
                </button>
            <LineChart width={700} height={400} data={data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
            </div>
        );
    }
}
export default Graph;

/*eslint-enable no-unused-vars*/
