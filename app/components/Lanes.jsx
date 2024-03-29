import React,{Component} from 'react'

import Lane from './Lane'

export default class Lanes extends Component{
  render(){
    const {lanes} = this.props
    return (
      <div className='lanes'>
        {lanes.map(lane => <Lane className='lane' key={lane.id} lane={lane}/>)}
      </div>
    )
  }
}