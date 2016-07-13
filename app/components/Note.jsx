import React,{Component} from 'react'

export default class Note extends Component{
  render(){
    const task = this.props.task
    return (
      <div>
        <span>{task}</span>
        <button onClick={this.props.onDelete}>x</button>
      </div>
    )
  }
}
