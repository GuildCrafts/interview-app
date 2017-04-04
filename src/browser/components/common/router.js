import React, {Component} from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from '../../components/Pages/Landing/index'

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path='/' component={Landing} />
      </BrowserRouter>
    )
  }
}
