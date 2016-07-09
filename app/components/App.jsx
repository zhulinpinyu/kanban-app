import React,{Component} from 'react'
import uuid from 'uuid'

import Notes from './Notes'

export default class App extends Component{
  constructor(){
    super()
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ]
    }
  }

  addNote(){
    this.setState({notes: [...this.state.notes,{id: uuid.v4(),task: 'new task'}]})
  }

  render(){
    const notes = this.state.notes
    return (
      <div>
        <button onClick={this.addNote.bind(this)}>+ Task</button>
        <Notes notes={notes}/>
      </div>
    )
  }
}
