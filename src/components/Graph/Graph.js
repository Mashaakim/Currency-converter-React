/*eslint-disable no-unused-vars*/

import React from 'react';
import axios from 'axios';
import Button from '../Button/Button'
import InputForm from '../InputForm/InputForm'
import SelectForm from '../SelectForm/SelectForm';
import Chart from '../Chart/Chart'
import './Graph.css';


class Graph extends React.Component {
    state = {
        start_date: '2018-11-11',
        end_date: '2018-11-30',
        url: 'https://api.exchangeratesapi.io/history?start_at=2019-11-11&end_at=2019-11-30&base=RUB',
        selected_valute: 'EUR',
        valutes: [],
        data: []
        };

    componentDidMount (){
        axios.get(this.state.url)
            .then(d => {
                let datesUnsorted = Object.keys(d.data.rates).map(function(key) {
                    let res = d.data.rates[key];
                    Object.keys(res).map(function(k) {
                        res[k] = 1.0 / res[k];
                    });
                    res['date'] = key;
                    return res });
                this.setState({
                    valutes: Object.keys(Object.values(d.data.rates)[0]),
                    data: datesUnsorted.sort( function (a,b) {
                        if (a.date > b.date) return 1;
                        else return -1;}),
                });
            });
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

    get = (url) => {
        axios.get(url)
            .then(d => {
                let datesUnsorted = Object.keys(d.data.rates).map(function(key) {
                    let res = d.data.rates[key];
                    Object.keys(res).map(function(k) {
                        res[k] = 1.0 / res[k];
                    });
                    res['date'] = key;
                    return res });
                this.setState({
                    valutes: Object.keys(Object.values(d.data.rates)[0]),
                    data: datesUnsorted.sort( function (a,b) {
                        if (a.date > b.date) return 1;
                        else return -1;}),
                });
            });
    };

    onClick = () => {
        this.setState({
        url: 'https://api.exchangeratesapi.io/history?start_at=' + this.state.start_date + '&end_at=' + this.state.end_date + '&base=RUB',
        });
        this.get(this.state.url);
    };

    render () {
        let dataKey = this.state.selected_valute;
        let data = this.state.data;
        return (
            <div>
                <div>
                    <span className="from"> From </span> <span className="to"> To </span>
                </div>
                <InputForm
                    type="date"
                    value={this.state.start_date}
                    onChange={this.inputStartHandler}
                />
                <InputForm
                    type="date"
                    value={this.state.end_date}
                    onChange={this.inputEndHandler}
                />
                <SelectForm
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
                </SelectForm>
                <Button onClick={this.onClick} >
                    Draw
                </Button>
                <Chart data={data} dataKey={dataKey}>
                </Chart>
            </div>
        );
    }
}
export default Graph;

/*eslint-enable no-unused-vars*/
