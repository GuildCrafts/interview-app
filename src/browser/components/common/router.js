import React, {Component} from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Landing from '../../components/Pages/Landing/index'

import Layout from '../common/router'
import Header from '../molecules/header/index'
import GameOptions from '../../components/molecules/game-options/index'
import SelectTag from '../../components/atoms/select-tag/index'
import Profile from '../pages/profile/index'

export default class Routes extends Component {
  render() {
    const fakeProfile = {
      profileName: {value: "Murphy"},
      topic: {value: "JavaScript"},
      gameMode: {value: "Speaking"}
    }
    const fakeStats = {
      experience: {value: 100, heading: "Experience"},
      difficulty: {value: "Beginner", heading: "Difficulty"}
    }

    const LandingComponent = (props, state, params) =>
    <Landing profile={fakeProfile} {...props}  stats={fakeStats} {...props}/>

    const GameOptionsComponent = (props, state, params) =>
    <GameOptions profile={fakeProfile} {...props} stats={fakeStats} {...props} />

    const ProfileComponent = (props, state, params) =>
    <Profile profile={fakeProfile} {...props} stats={fakeStats} {...props} />


    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={LandingComponent} />
          <Route path='/test' component={GameOptionsComponent} />
          <Route path='/profile' component={ProfileComponent} />
          <Route path='/:topic/:difficulty' component={LandingComponent} />
        </div>
      </BrowserRouter>
    )
  }
}
