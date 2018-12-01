/*eslint-disable no-unused-vars*/

import React from 'react';
import Converter from './Converter'
import Graph from './Graph'

class App extends React.Component {

  state = {
    value: 0,
  };

  render = () => {
    return (
      <div>
        <div>
          <button onClick={() => {this.setState({value: 0})}} >Currency converter</button>
          <button onClick={() => {this.setState({value: 1})}} >Chart</button>
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