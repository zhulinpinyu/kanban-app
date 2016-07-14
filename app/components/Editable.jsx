import React, {Component} from 'react'

export default class Editable extends Component{
  finishEdit(e){
    const value = e.target.value
    this.props.onEdit(value)
  }

  checkEnter(e){
    if(e.key==='Enter'){
      this.finishEdit(e)
    }
  }

  render(){
    const {editing,value,onEdit} = this.props
    if(editing){
      return (
        <input
         type="text"
         autoFocus={true}
         defaultValue={value}
         onBlur={this.finishEdit.bind(this)}
         onKeyPress={this.checkEnter.bind(this)}
        />
      )
    }else{
      return (
        <span>{value}</span>
      )
    }
  }
}
