import React,{Component} from 'react'
import flex from 'react-uikit-flex'

import StatCounter from '../stat-counter/index'

export default class StatBox extends Component {
  constructor() {
    super()
  }
  render(){
    return(
      <div className="uk-flex uk-grid-small uk-margin-left">
        <div className="uk-flex uk-flex-left">
          {this.props.name} <StatCounter count={this.props.count}/>
        </div>
      </div>
    )
  }
}
