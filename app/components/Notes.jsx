import React,{Component} from 'react'

import Note from './Note'
import Editable from './Editable'

export default class Notes extends Component{
  render(){
    const notes = this.props.notes
    return (
      <ul className='notes'>
        {notes.map(note =>
          <li key={note.id}>
            <Note className='note' onClick={this.props.onNoteClick.bind(this,note.id)}>
              <Editable
                className='editable'
                onEdit={this.props.onEdit.bind(this,note.id)}
                value={note.task}
                editing={note.editing}
              />
              <button className='delete' onClick={this.props.onDelete.bind(this,note.id)}>&times;</button>
            </Note>
          </li>
        )}
      </ul>
    )
  }
}
