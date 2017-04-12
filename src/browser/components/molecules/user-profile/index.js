import React, { Component } from 'react'
import { render } from 'react-dom'
import flex from 'react-uikit-flex'
import Layout from '../../pages/layout/index'


export default class UserProfile extends Component {
  render(props){
    const user = this.props.user
    return (
      <div>
        <div style={{width:'200', height:'250', backgroundColor:'gray'}}>
        </div>
        <h3>{user.profileName.value}</h3>
        <p>Joined on: {"04/09/2017"}</p>
        <p>Experience: {"Ultra Advanced"}</p>
        <p>Interviews Completed: {25}</p>
        <p>Interviews Assisted: {10}</p>
        <p>Notes: {"this app is awesome"}</p>
        <p>Questions Submitted: {4}</p>
      </div>
    )
  }
}
