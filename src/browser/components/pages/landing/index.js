import React, {Component} from 'react'
import QueryString from 'query-string'
import {uniq, flatMap, take, shuffle} from 'lodash'

import Layout from '../layout/index'
import Game from '../game/index'
import GameOptions from '../../molecules/game-options/index'
import Header from '../../molecules/header/index'
import Request from '../../common/requests'

require('../../../../../public/stylesheets/uikit.min.css')

export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

    return (
      <div className="uk-container">
        <Layout profile={this.props.profile} stats={this.props.stats}>
          <GameOptions />
        </Layout>
      </div>
    )
  }
}
