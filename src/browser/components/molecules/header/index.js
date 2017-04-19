import React, {Component} from 'react'
import flex from 'react-uikit-flex'

import ProfileBox from '../../atoms/profile-box/index'
import StatBox from '../../atoms/stat-box/index'
import AddInput from '../prompt-input/index'
import Form from '../../molecules/form/index'
import Requests from '../../common/requests'
import Menu from '../../molecules/menu/index'

require('../../../../../public/stylesheets/uikit.min.css')

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <nav className="uk-navbar">
          <div className="uk-offcanvas-content">
            <button className="uk-button uk-button-default uk-margin-top uk-margin-small-right" type="button" data-uk-toggle="target: #offcanvas-nav-primary">Menu</button>
            <Menu />
          </div>
          <ul className="uk-navbar-right">
            <ProfileBox profile={this.props.profile.name}/>
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
