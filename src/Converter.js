/*eslint-disable no-unused-vars*/

import React from 'react';
import axios from 'axios'

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
          console.log(d.data.Valute);
        this.setState({
          valutes: d.data.Valute,
          selected_valute_1: Object.values(d.data.Valute)[0],
          selected_valute_2: Object.values(d.data.Valute)[0],
        })
      })
  }

  inputHandler = (event) => {
    this.setState({inputted_value: event.target.value}
  )};

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
        <input
          value={this.state.inputted_value}
          onChange={this.inputHandler}
        />
        <select
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
        </select>
        <select
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
        </select>
        <button onClick={() => {
          this.setState({
            selected_valute_1: this.state.selected_valute_2,
            selected_valute_2: this.state.selected_valute_1,
          })
        }} >
          swap
        </button>
        <div>
          {result}
        </div>
      </div>
    )
  }
}

export default (App)

/*eslint-enable no-unused-vars*/