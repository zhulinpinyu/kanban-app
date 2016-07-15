import React,{Component} from 'react'
import uuid from 'uuid'

import Notes from './Notes'
import connect from '../libs/connect'

class App extends Component{
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

  activateNoteEdit(id){
    this.setState({notes: this.state.notes.map(note =>{
      if(note.id === id){
        note.editing = true
      }
      return note
    })})
  }

  editNote(id,task){
    this.setState({notes: this.state.notes.map(note =>{
      if(note.id === id){
        note.editing = false
        note.task = task
      }
      return note
    })})
  }

  deleteNote(id){
    this.setState({notes: this.state.notes.filter(note => note.id !== id)})
  }

  render(){
    const notes = this.state.notes
    return (
      <div>
        {this.props.test}
        <button className='add-note' onClick={this.addNote.bind(this)}>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.activateNoteEdit.bind(this)}
          onEdit={this.editNote.bind(this)}
          onDelete={this.deleteNote.bind(this)}/>
      </div>
    )
  }
}

export default connect(()=>({test: 'test'}))(App)
