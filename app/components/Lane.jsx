import React,{Component} from 'react'
import {compose} from 'redux'
import {DropTarget} from 'react-dnd'
import ItemTypes from '../constants/itemTypes'

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
    return this.props.connectDropTarget(
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

const noteTarget = {
  hover(targetProps,monitor){
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id
    if(!targetProps.lane.notes.length){
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      })
    }
  }
}

export default compose(
  DropTarget(ItemTypes.NOTE,noteTarget,connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect(({notes})=>({
    notes
  }),{
    NoteActions,
    LaneActions
  })
)(Lane)