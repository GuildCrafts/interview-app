import React, { Component } from 'react'
import { render } from 'react-dom'
var NotificationSystem = require('react-notification-system');

import Header from '../../molecules/header/index'


export default class Layout extends Component {

  constructor(props) {
    super(props)
    this._notificationSystem = null
    this.addNotification = this.addNotification.bind(this)
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  addNotification(message, level='success') {
    this._notificationSystem.addNotification({
      message: message,
      level: level
    });
  }

  render() {
    return (
      <div className="uk-container">
        <Header profile={this.props.profile}
                stats={this.props.stats}
                addNotification={this.addNotification} />
        <NotificationSystem ref="notificationSystem" />
        <div className="uk-card uk-card-default uk-card-body uk-width-1-1 uk-padding">
          {this.props.children}
        </div>
      </div>
    )
  }
}
