/*eslint-disable no-unused-vars*/

import React from 'react';
import axios from 'axios';
import './Converter.css';
import SelectForm from '../SelectForm/SelectForm';
import Button from '../Button/Button';
import InputForm from '../InputForm/InputForm';

let url = `https://www.cbr-xml-daily.ru/daily_json.js`;

class Converter extends React.Component {

  state = {
    valutes: {},
    selected_valute_1: {},
    selected_valute_2: {},
    inputted_value: ``,
      timestamp: '',
  };

  componentDidMount () {
    axios.get(url)
      .then(d => {
          let valute = d.data.Valute;
          valute["RUB"] = {
              CharCode: "RUB",
              Value: 1,
          };

        this.setState({
          valutes: valute,
          selected_valute_1: Object.values(d.data.Valute)[0],
          selected_valute_2: Object.values(d.data.Valute)[0],
            timestamp: d.data.Timestamp,
        })
      })
  }

  inputHandler = (event) => {
      if (isNaN(Number(event.target.value))){
          this.setState({
              inputted_value: '',
          })
      } else {
          this.setState({inputted_value: event.target.value})
      }
  };

  selectHandler_1 = (event) => {
    this.setState({selected_valute_1: this.state.valutes[event.target.value]})
  };

  selectHandler_2 = (event) => {
    this.setState({selected_valute_2: this.state.valutes[event.target.value]})
  };

  render = () => {
    let result = (this.state.inputted_value * this.state.selected_valute_1.Value / this.state.selected_valute_2.Value).toFixed(4)
    return (
      <div>
          <div>
              <span className="amount"> Amount </span>
          </div>
        <InputForm
          value={this.state.inputted_value}
          onChange={this.inputHandler}
        />
          <SelectForm
              value={this.state.selected_valute_1.CharCode}
              onChange={this.selectHandler_1}
          >
              {
                  Object.values(this.state.valutes).map((item, index) => {
                      return (
                          <option key={index} >
                              {item.CharCode}
                          </option>
                      )
                  })
              }
          </SelectForm>
          <Button className='button' onClick={() => {
              this.setState({
                  selected_valute_1: this.state.selected_valute_2,
                  selected_valute_2: this.state.selected_valute_1,
              })
          }} >
          </Button>
        <SelectForm
          value={this.state.selected_valute_2.CharCode}
          onChange={this.selectHandler_2}
        >
          {
            Object.values(this.state.valutes).map((item, index) => {
              return (
                <option key={index} >
                  {item.CharCode}
                </option>
              )
            })
          }
        </SelectForm>
        <div className='result'>
            {this.state.inputted_value + ' ' + this.state.selected_valute_1.CharCode + ' = '}
            <p className='big'>
                {result + ' ' + this.state.selected_valute_2.CharCode}
            </p>
        </div>
          <div className="time">
              {'Last updated: ' + this.state.timestamp}
          </div>
      </div>
    )
  }
}

export default Converter;

/*eslint-enable no-unused-vars*/