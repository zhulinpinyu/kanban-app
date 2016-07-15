import React,{Component} from 'react'
import uuid from 'uuid'

import Lanes from './Lanes'
import connect from '../libs/connect'
import LaneActions from '../actions/LaneActions'

class App extends Component{

  addLane(){
    this.props.LaneActions.create({id: uuid.v4(),name: 'New Lane'})
  }

  render(){
    const lanes = this.props.lanes
    return (
      <div>
        <button className='add-note' onClick={this.addLane.bind(this)}>+</button>
        <Lanes lanes={lanes}/>
      </div>
    )
  }
}

export default connect(({lanes})=>({
  lanes
}),{
  LaneActions
})(App)
