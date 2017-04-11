import React, { Component } from 'react'
import { render } from 'react-dom'
import ProfileBox from '../../atoms/profile-box/index'
import Header from '../../molecules/header/index'



export default class Layout extends Component {
  render() {
    return (
      <div className="uk-container">
        <Header profile={this.props.profile} stats={this.props.stats} />
        <div className="uk-card uk-card-default uk-card-body uk-width-1-1 uk-padding">
          {this.props.children}
        </div>
      </div>
    )
  }
}
