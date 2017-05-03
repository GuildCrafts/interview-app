import React, {Component} from 'react'

import Layout from '../layout/index'
import GameOptions from '../../molecules/game-options/index'


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
          <GameOptions topics={this.props.topics}/>
        </Layout>
      </div>
    )
  }
}
