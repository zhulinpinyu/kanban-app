import React,{Component} from 'react'

import Note from './Note'

export default class Notes extends Component{
  render(){
    const notes = this.props.notes
    return (
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Note onDelete={this.props.onDelete.bind(this,note.id)}  task={note.task}/>
          </li>
        )}
      </ul>
    )
  }
}
