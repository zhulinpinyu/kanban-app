import React,{Component} from 'react'

export default function(state,actions){
  if(typeof state === 'function' || (typeof state ==='object' && Object.keys(state).length)){
    return function(target){
      return connect(state,actions,target)
    }
  }
  return function(target){
    return function(props){
      return <target {...Object.assign({},props,actions)}/>
    }
  }
}

function connect(state=()=>{},actions={},target){
  class Connect extends Component{
    componentDidMount(){
      const {flux} = this.context
      flux.FinalStore.listen(this.handleChange.bind(this))
    }

    componentWillUnmount(){
      const {flux} = this.context
      flux.FinalStore.unlisten(this.handleChange.bind(this))
    }

    handleChange(){
      this.forceUpdate()
    }

    composeStores(stores){
      let ret = {}
      Object.keys(stores).forEach(k=>{
        const store = stores[k]
        ret = Object.assign({},ret,store.getState())
      })
      return ret
    }

    render(){
      const {flux} = this.context
      const stores = flux.stores
      const composedStores = this.composeStores(stores)
      return React.createElement(target,
        {...Object.assign(
          {},this.props,state(composedStores),actions
        )}
      )
    }
  }
  Connect.contextTypes = {
    flux: React.PropTypes.object.isRequired
  }
  return Connect
}