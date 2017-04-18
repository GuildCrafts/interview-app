import React, {Component} from 'react'
import flex from 'react-uikit-flex'
import ProfileBox from '../../atoms/profile-box/index'
import StatBox from '../../atoms/stat-box/index'
import AddInput from '../prompt-input/index'
import NewQuestion from '../../molecules/new-question/index'


require('../../../../../public/stylesheets/uikit.min.css')

export default class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div id="offcanvas-nav-primary" data-uk-offcanvas="overlay: false">
        <div className="uk-offcanvas-bar uk-flex uk-flex-column">
          <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            <li className="uk-active">
              <a href="#">Start New Interview</a>
              <ul className="uk-nav-sub">
                <li><a href="/approval">Approve Questions</a></li>
                <li>
                  <button className="uk-button uk-button-default uk-margin-small-right" type="button" data-uk-toggle="target: #modal-example">Create Question</button>
                  <NewQuestion />
                </li>
                <li className="uk-nav-divider"></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
