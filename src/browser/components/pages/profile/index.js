import React, { Component } from 'react'
import { render } from 'react-dom'
import ProfileBox from '../../atoms/profile-box/index'
import Header from '../../molecules/header/index'
import Layout from '../layout/index'
import UserProfile from '../../molecules/user-profile/index'

export default class Profile extends Component {
  render() {
    return (
      <Layout profile={this.props.profile} stats={this.props.stats}>
        <UserProfile user={this.props.profile}/>
      </Layout>
    )
  }
}
