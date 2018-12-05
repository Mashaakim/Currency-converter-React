/*eslint-disable no-unused-vars*/

import React from 'react';
import Converter from './Converter'
import Graph from './Graph'
import './App.css';
import Button from './components/Button/Button'

class App extends React.Component {

  state = {
    value: 0,
  };

  render = () => {
    return (
      <div className="App">
        <div>
          <Button onClick={() => {this.setState({value: 0})}} >Currency converter</Button>
          <Button onClick={() => {this.setState({value: 1})}} >Chart</Button>
        </div>

        {
          this.state.value === 0
            ? <Converter/>
            : <Graph/>
        }

      </div>
    )
  }
}

export default (App)

/*eslint-enable no-unused-vars*/