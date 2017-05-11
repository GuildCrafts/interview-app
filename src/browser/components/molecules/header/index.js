import React, {Component} from 'react'
import flex from 'react-uikit-flex'

import ProfileBox from '../../atoms/profile-box/index'
import StatBox from '../../atoms/stat-box/index'
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
            <Menu {...this.props} />
          </div>
          <ul className="uk-navbar-right">
            <ProfileBox profile={this.props.profile.name}/>
          </ul>
        </nav>
      </div>
    )
  }
}
