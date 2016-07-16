import React,{Component} from 'react'
import uuid from 'uuid'

import connect from '../libs/connect'
import NoteActions from '../actions/NoteActions'
import LaneActions from '../actions/LaneActions'
import Editable from './Editable'

class LaneHeader extends Component{

  addNote(e){
    e.stopPropagation()
    const noteId = uuid.v4()
    this.props.NoteActions.create({id: noteId, task: 'new task'})
    this.props.LaneActions.attachToLane({
      laneId: this.props.lane.id,
      noteId
    })
  }

  activateLaneEdit(){
    this.props.LaneActions.update({
      id: this.props.lane.id,
      editing: true
    })
  }

  editName(name){
    this.props.LaneActions.update({
      id: this.props.lane.id,
      name,
      editing: false
    })
  }

  deleteLane(e){
    e.stopPropagation()
    this.props.LaneActions.delete(this.props.lane.id)
  }

  render(){
    const {lane} = this.props
    return (
      <div className="lane-header" onClick={this.activateLaneEdit.bind(this)}>
        <div className="lane-add-note">
          <button onClick={this.addNote.bind(this)}>+</button>
        </div>
        <Editable className="lane-name" editing={lane.editing} onEdit={this.editName.bind(this)} value={lane.name}/>
        <div className="lane-delete">
          <button onClick={this.deleteLane.bind(this)}>&times;</button>
        </div>
      </div>
    )
  }
}

export default connect(()=>({}),{
  NoteActions,
  LaneActions
})(LaneHeader)