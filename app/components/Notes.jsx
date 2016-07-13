import React,{Component} from 'react'

export default class Notes extends Component{
  render(){
    const notes = this.props.notes
    return (
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.task}</li>
        )}
      </ul>
    )
  }
}
