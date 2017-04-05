import React, {Component} from 'react'
import flex from 'react-uikit-flex'

import ProfileBox from '../../atoms/profile-box/index'
import StatBox from '../../atoms/stat-box/index'
require('../../../../../public/stylesheets/uikit.min.css')

export default class Header extends Component {
  constructor() {
    super()
  }

  render() {
    console.log(this.props.stats)
    return (
      <div>
        <nav className="uk-navbar">
          <ul className="uk-navbar-right">
            <ProfileBox profile={this.props.profile.profileName.value}/>
            <ProfileBox profile={this.props.profile.topic.value}/>
            <ProfileBox profile={this.props.profile.gameMode.value}/>
            <StatBox name={this.props.stats.experience.heading} count={this.props.stats.experience.value}/>
            <StatBox name={this.props.stats.difficulty.heading} count={this.props.stats.difficulty.value}/>
          </ul>
        </nav>
      </div>
    )
  }
}
