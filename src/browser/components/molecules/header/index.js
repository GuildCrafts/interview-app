import React, {Component} from 'react'

require('../../../../../public/stylesheets/uikit.min.css')

export default class Header extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <nav className="uk-navbar">
          <div className="uk-h2">
            Parent
            <ul className="uk-navbar-nav">
              <li>a</li>
              <li>b</li>
              <li>c</li>
            </ul>
          </div>
          <div className="uk-navbar-flip">
            <ul className="uk-navbar-nav">
              <li className="uk-active">Foo</li>
              <li>Bar</li>
              <li>Baz</li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
