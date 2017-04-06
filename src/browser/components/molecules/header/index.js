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
    return (
      <div>
        <nav className="uk-navbar">
          <div className="uk-offcanvas-content">
            <button className="uk-button uk-button-default uk-margin-top uk-margin-small-right" type="button" data-uk-toggle="target: #offcanvas-nav-primary">Menu</button>
            <div id="offcanvas-nav-primary" data-uk-offcanvas="overlay: false">
              <div className="uk-offcanvas-bar uk-flex uk-flex-column">
                <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
                  <li className="uk-active">
                    <a href="#">Start New Interview</a>
                    <ul className="uk-nav-sub">
                      <li><a href="#">Approve Questions</a></li>
                      <li><a href="#">Create New Question</a></li>
                      <li className="uk-nav-divider"></li>
                      <li><a href="#">Profile</a></li>
                      <li><a href="#">Log Out</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

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
