import React, {Component} from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Landing from '../../components/Pages/Landing/index'

import GameOptions from '../../components/molecules/game-options/index'
import SelectTag from '../../components/atoms/select-tag/index'
import ApprovalPage from '../pages/approval/index'

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Landing} />
          <Route path='/test' component={GameOptions} />
          <Route path='/:topic/:difficulty' component={Landing} />
          <Route path='/approval' component={ApprovalPage} />
        </div>
      </BrowserRouter>
    )
  }
}
