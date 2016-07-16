import LaneActions from '../actions/LaneActions'

export default class LaneStore{
  constructor(){
    this.bindActions(LaneActions)
    this.lanes = []
  }

  create(lane){
    lane.notes = lane.notes||[]
    this.setState({
      lanes: this.lanes.concat(lane)
    })
  }

  update(updateLane){
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.id === updateLane.id){
          lane = {...lane,...updateLane}
        }
        return lane
      })
    })
  }

  delete(laneId){
    this.setState({
      lanes: this.lanes.filter(lane => lane.id!==laneId)
    })
  }

  attachToLane({laneId,noteId}){
    this.setState({
      lanes: this.lanes.map(lane =>{
        if(lane.notes.includes(noteId)){
          lane.notes = lane.notes.filter(nId => nId !== noteId)
        }
        if(lane.id === laneId){
          lane.notes = lane.notes.concat([noteId])
        }
        return lane
      })
    })
  }

  detachFromLane({laneId,noteId}){
    this.setState({
      lanes: this.lanes.map(lane =>{
        if(lane.id===laneId){
          lane.notes = lane.notes.filter(nId => nId !== noteId)
        }
        return lane
      })
    })
  }
}