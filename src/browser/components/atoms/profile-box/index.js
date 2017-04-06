import React, {Component} from 'react'
import flex from 'react-uikit-flex'

export default class ProfileBox extends Component {
  constructor() {
    super()
  }

  render(){
    return(
      <div className="uk-flex uk-grid-small uk-margin-left">
        <div className="uk-flex uk-flex-left">
          {this.props.profile}
        </div>
      </div>
    )
  }
}
