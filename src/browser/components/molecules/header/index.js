import React, {Component} from 'react'
import flex from 'react-uikit-flex'
import ProfileBox from '../../atoms/profile-box/index'
import StatBox from '../../atoms/stat-box/index'
import AddInput from '../prompt-input/index'


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
            <div id="offcanvas-nav-primary" data-uk-offcanvas="overlay: false">
              <div className="uk-offcanvas-bar uk-flex uk-flex-column">
                <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
                  <li className="uk-active">
                    <a href="#">Start New Interview</a>
                    <ul className="uk-nav-sub">
                      <li><a href="#">Approve Questions</a></li>
                      <li>
                        <button className="uk-button uk-button-default uk-margin-small-right" type="button" data-uk-toggle="target: #modal-example">Create Question</button>
                        <div id="modal-example" data-uk-modal>
                          <div className="uk-modal-dialog uk-modal-body">
                              <h2 className="uk-modal-title uk-text-center">New Question Form</h2>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <form className="uk-form-horizontal uk-margin-large">
                                <div className="uk-margin">
                                    <label className="uk-form-label" htmlFor="form-horizontal-text">What Is Your Question?</label>
                                    <div className="uk-form-controls">
                                        <input className="uk-input" id="form-horizontal-text" type="text" placeholder="What is the meaning of life, the universe, and everything?" />
                                    </div>
                                </div>
                                <div className="uk-margin">
                                    <label className="uk-form-label" htmlFor="form-horizontal-text">What Is The Answer?</label>
                                    <div className="uk-form-controls">

                                        <input className="uk-input" id="form-horizontal-text" type="text" placeholder="42" />
                                    </div>
                                </div>
                                <div className="uk-margin">
                                    <label className="uk-form-label" htmlFor="form-horizontal-select">Topic</label>
                                    <div className="uk-form-controls">
                                        <select className="uk-select" id="form-horizontal-select">
                                            <option>core-javascript</option>
                                            <option>functional-programming</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uk-margin">
                                    <div className="uk-form-label">Difficulty Levels</div>
                                    <div className="uk-form-controls uk-form-controls-text">
                                        <label><input className="uk-radio" type="radio" name="radio1" /> Beginner</label><br></br>
                                        <label><input className="uk-radio" type="radio" name="radio1" /> Intermediate</label><br></br>
                                        <label><input className="uk-radio" type="radio" name="radio1" /> Advanced</label><br></br>
                                        <label><input className="uk-radio" type="radio" name="radio1" /> Jedi</label>
                                    </div>
                                </div>
                                <AddInput />
                            </form>
                            <p className="uk-text-right">
                                <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                                <button className="uk-button uk-button-primary" type="button">Save</button>
                            </p>
                          </div>
                        </div>
                      </li>
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
