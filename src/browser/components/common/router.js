import React, {Component} from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Landing from '../../components/Pages/Landing/index'
import Layout from '../common/router'
import Header from '../molecules/header/index'
import ApprovalPage from '../pages/approval/index'
import Profile from '../pages/profile/index'
import Requests from './requests'

export default class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {user: {dummy: true}}
  }

  componentDidMount() {
    Requests.getUserName('/api/users/current_user')
    .then(user => {
      this.setState(Object.assign(this.state, {user: user}))
    })
  }

  render() {
    const realProfileName = this.state.user.name
    const fakeProfile = {
      name: realProfileName,
      topic: {value: "JavaScript"},
      gameMode: {value: "Speaking"}
    }

    const fakeStats = {
      experience: {value: 100, heading: "Experience"},
      difficulty: {value: "Beginner", heading: "Difficulty"}
    }

    const LandingComponent = (props, state, params) =>
    <Landing profile={fakeProfile} {...props}  stats={fakeStats} />

    const GameOptionsComponent = (props, state, params) =>
    <GameOptions profile={fakeProfile} {...props} stats={fakeStats} />

    const ProfileComponent = (props, state, params) =>
    <Profile profile={fakeProfile} {...props} stats={fakeStats} />

    const ApprovalComponent = (props, state, params) =>
    <ApprovalPage profile={fakeProfile} stats={fakeStats} {...props} />

    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={LandingComponent} />
          <Route path='/:topic/:difficulty' component={LandingComponent} />
          <Route path='/approval' component={ApprovalComponent} />
          <Route path='/profile' component={ProfileComponent} />
        </div>
      </BrowserRouter>
    )
  }
}
