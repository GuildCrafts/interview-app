import React, {Component} from 'react'
import FormSelect from '../../atoms/form-select/index'
import Form from '../../molecules/form/index'
import Requests from '../../common/requests'

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

  render() {
    const topics = this.props.topics || []
    const difficulty = this.props.difficulty || []
    const gameModes = this.props.gameModes || []

    return (
      <div>
        <h2>Time to mock interview</h2>
        <h4>Select your options</h4>
          <Form inputModules={this.state.form} onSubmit={this.props.onSubmit} key='gameOptionForm'/>
      </div>
    )
  }
}
