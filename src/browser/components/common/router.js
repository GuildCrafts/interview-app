import React, {Component} from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'


import Landing from '../pages/landing/index'
import Layout from '../common/router'
import Header from '../molecules/header/index'
import Game from '../pages/game/index'
import ApprovalPage from '../pages/approval/index'
import Profile from '../pages/profile/index'
import Requests from './requests'

constructor(props) {
export default class Routes extends Component {
    super(props)
    this.state = {user: {},
                  topics: [],
                  topicsWithQuestions: [],
                  message: ''
                }
  }

  componentDidMount() {
    Promise.all([Requests.get('/api/users/current_user'), Requests.get('/api/topics/'), Requests.get('/api/topics/with-questions')])
    .then(([user, topicsResponse, topicsWithQuestionsResponse]) => {
      this.setState(Object.assign(this.state, { user: user, topics: topicsResponse.topics, topicsWithQuestions: topicsWithQuestionsResponse.topics }))
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
    <Landing profile={fakeProfile} stats={fakeStats} {...props}
      topics={this.state.topicsWithQuestions} />

    const ProfileComponent = (props, state, params) =>
    <Profile profile={fakeProfile} stats={fakeStats} {...props} topics={this.state.topics}/>

    const ApprovalComponent = (props, state, params) =>
    <ApprovalPage profile={fakeProfile} stats={fakeStats} {...props} topics={this.state.topics}/>


    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={LandingComponent} />
          <Route path='/:topic/:difficulty' component={LandingComponent} />
          <Route path='/game' component={Game} />
          <Route path='/approval' component={ApprovalComponent} />
          <Route path='/profile' component={ProfileComponent} />
        </div>
      </BrowserRouter>
    )
  }
}
