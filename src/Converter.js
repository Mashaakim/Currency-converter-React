/*eslint-disable no-unused-vars*/

import React from 'react';
import axios from 'axios';
import './Converter.css';
import SelectForm from './components/SelectForm/SelectForm';
import Button from './components/Button/Button';
import InputForm from './components/InputForm/InputForm';

let url = `https://www.cbr-xml-daily.ru/daily_json.js`;

class App extends React.Component {

  state = {
    valutes: {},
    selected_valute_1: {},
    selected_valute_2: {},
    inputted_value: ``,
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
      </div>
    )
  }
}

export default (App)

/*eslint-enable no-unused-vars*/