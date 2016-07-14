import React,{Component} from 'react'

import Note from './Note'
import Editable from './Editable'


export default class Notes extends Component{

  render(){
    const notes = this.props.notes
    return (
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Note onClick={this.props.onNoteClick.bind(this,note.id)}>
              <Editable
                onEdit={this.props.onEdit.bind(this,note.id)}
                value={note.task}
                editing={note.editing}
              />
              <button onClick={this.props.onDelete.bind(this,note.id)}>x</button>
            </Note>
          </li>
        )}
      </ul>
    )
  }
}
