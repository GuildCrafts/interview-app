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
    this.state = {user: {dummy: true},
                  topics: []}
  }

  componentDidMount() {
    Promise.all([Requests.get('/api/users/current_user'),Requests.get('/api/topics/')])
    .then(([user, topics]) => {
      this.setState(Object.assign(this.state, {user: user, topics: topics}))
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
    <Landing profile={fakeProfile} {...props}  stats={fakeStats} {...props} topics={this.state.topics}/>

    const GameOptionsComponent = (props, state, params) =>
    <GameOptions profile={fakeProfile} {...props} stats={fakeStats} {...props} topics={this.state.topics}/>

    const ProfileComponent = (props, state, params) =>
    <Profile profile={fakeProfile} {...props} stats={fakeStats} {...props} topics={this.state.topics}/>

    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={LandingComponent} />
          <Route path='/:topic/:difficulty' component={LandingComponent} />
          <Route path='/approval' component={ApprovalPage} />
          <Route path='/profile' component={ProfileComponent} />
        </div>
      </BrowserRouter>
    )
  }
}
