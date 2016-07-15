import React,{Component} from 'react'
import uuid from 'uuid'

import connect from '../libs/connect'
import NoteActions from '../actions/NoteActions'
import LaneActions from '../actions/LaneActions'

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

  render(){
    const {lane} = this.props
    return (
      <div className="lane-header">
        <div className="lane-add-note">
          <button onClick={this.addNote.bind(this)}>+</button>
        </div>
        <div className="lane-name">{lane.name}</div>
      </div>
    )
  }
}

export default connect(()=>({}),{
  NoteActions,
  LaneActions
})(LaneHeader)