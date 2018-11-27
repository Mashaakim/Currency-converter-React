/*eslint-disable no-unused-vars*/

import React from 'react';
import Converter from './Converter'

class App extends React.Component {

  state = {
    value: 0,
  }

  render = () => {
    return (
      <div>
        <div>
          <button onClick={() => {this.setState({value: 0})}} >1</button>
          <button onClick={() => {this.setState({value: 1})}} >2</button>
        </div>

        {
          this.state.value === 0
            ? <Converter/>
            : <div>вкладка 2</div>
        }

      </div>
    )
  }
}

export default (App)

/*eslint-enable no-unused-vars*/