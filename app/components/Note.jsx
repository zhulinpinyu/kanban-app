import React,{Component} from 'react'
import {DragSource,DropTarget} from 'react-dnd'
import {compose} from 'redux'

import ItemTypes from '../constants/itemTypes'

class Note extends Component{
  render(){
    const {connectDragSource,connectDropTarget,isDragging,isOver,editing,onClick} = this.props
    const dragSource = editing ? a => a : connectDragSource
    return compose(dragSource,connectDropTarget)(
      <div className={this.props.className} style={{opacity: isDragging||isOver ? 0 : 1}} onClick={onClick}>
        {this.props.children}
      </div>
    )
  }
}

const noteSource = {
  beginDrag(props){
    return {
      id: props.id
    }
  }
}

const noteTarget = {
  hover(targetProps,monitor){
    const targetId = targetProps.id
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id
    targetProps.onMove({sourceId,targetId})
  }
}

export default compose(
  DragSource(ItemTypes.NOTE,noteSource, (connect,monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.NOTE,noteTarget, (connect,monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))
)(Note)