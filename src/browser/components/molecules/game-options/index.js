import React, {Component} from 'react'
import {uniq, flatMap, take, shuffle} from 'lodash'

import Form from '../../molecules/form/index'
import Game from '../../pages/game/index'

const inputModules = [
  {
    "type"    : "Select",
    "prompt"  : "Difficulty",
    "options" : ["any","beginner","intermediate"],
    "tag"     : "difficulty",
    "isOptionRequired": true
  },
  {
    "type"    : "Checkbox",
    "prompt"  : "Topic",
    "options" : [],
    "tag"     : "topic",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "prompt"  : "Game Mode",
    "options" : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"     : "game_mode",
    "isOptionRequired": true
  }
]

export default class GameOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {form: inputModules}
    this.state.form[1].options = ['any'].concat(this.props.topics)
  }

  // componentDidMount(){
  //   Requests.get('/api/topics/')
  //   .then(response => {
  //     let currentState = this.state
  //     currentState.form[1].options = ['any'].concat(response)
  //     this.setState(currentState)
  //   })
  // }

  // handleChange( tag, data ){
  //   this.setState( {[tag]: data} )
  // }

  render() {
    const topics = this.props.topics || []
    const difficulty = this.props.difficulty || []
    const gameModes = this.props.gameModes || []
    let correctElement
    if (this.state.isForm) {
      correctElement = <Form inputModules={inputModules} onSubmit={this.getQuestions.bind(this)} key='gameOptionForm'/>
    }
    else if (!this.state.isForm) {
      correctElement = <Game questions={this.state.questions} />
    }
    return (
      <div>
        <h2>Mock Interview</h2>
        <h4>Select your options</h4>
        {correctElement}
      </div>
    )
  }
}
