import React,{Component} from 'react'
import uuid from 'uuid'

import Notes from './Notes'
import connect from '../libs/connect'
import NoteActions from '../actions/NoteActions'

class App extends Component{

  addNote(){
    this.props.NoteActions.create({id: uuid.v4(),task: 'new task'})
  }

  activateNoteEdit(id){
    this.props.NoteActions.update({id,editing: true})
  }

  editNote(id,task){
    this.props.NoteActions.update({id,task,editing: false})
  }

  deleteNote(id,e){
    e.stopPropagation() //阻止事件继续传播。也就是说不会再触发edit
    this.props.NoteActions.delete(id)
  }

  render(){
    const notes = this.props.notes
    return (
      <div>
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

export default connect(({notes})=>({
  notes
}),{
  NoteActions
})(App)
