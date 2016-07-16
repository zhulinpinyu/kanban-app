import React,{Component} from 'react'

import Notes from './Notes'
import connect from '../libs/connect'
import NoteActions from '../actions/NoteActions'
import LaneActions from '../actions/LaneActions'
import LaneHeader from './LaneHeader'

class Lane extends Component{

  editNote(id,task){
    this.props.NoteActions.update({id,task,editing: false})
  }

  deleteNote(noteId,e){
    e.stopPropagation() //阻止事件继续传播。也就是说不会再触发edit
    this.props.LaneActions.detachFromLane({
      laneId: this.props.lane.id,
      noteId
    })
    this.props.NoteActions.delete(noteId)
  }

  activateNoteEdit(id){
    this.props.NoteActions.update({id,editing: true})
  }

  selectNotesByIds(notes,notesId=[]){
    return notes.filter(note => notesId.includes(note.id))
  }

  render(){
    const {lane} = this.props
    return (
      <div className={this.props.className}>
        <LaneHeader lane={lane}/>
        <Notes
          notes={this.selectNotesByIds(this.props.notes,lane.notes)}
          onNoteClick={this.activateNoteEdit.bind(this)}
          onEdit={this.editNote.bind(this)}
          onDelete={this.deleteNote.bind(this)}
        />
      </div>
    )
  }
}

export default connect(({notes})=>({
  notes
}),{
  NoteActions,
  LaneActions
})(Lane)