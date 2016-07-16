import React,{Component} from 'react'
import uuid from 'uuid'
import {compose} from 'redux'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

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
        <button className='add-lane' onClick={this.addLane.bind(this)}>+</button>
        <Lanes lanes={lanes}/>
      </div>
    )
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(({lanes})=>({
    lanes
  }),{
    LaneActions
  })
)(App)
