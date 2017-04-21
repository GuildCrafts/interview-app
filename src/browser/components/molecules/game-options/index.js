import React, {Component} from 'react'
import FormSelect from '../../atoms/form-select/index'
import Form from '../../molecules/form/index'

const inputModules = [
  {
    "type"    : "Select",
    "prompt"  : "Difficulty",
    "options" : ["any","beginner","intermediate"],
    "tag"     : "difficulty",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "prompt"  : "Topic",
    "options" : ["any","core-javascript","http","sql"],
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
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    this.props.onSubmit(this.state)
  }

  handleChange( tag, data ){
    this.setState( {[tag]: data} )
  }

  render() {
    const topics = this.props.topics || []
    const difficulty = this.props.difficulty || []
    const gameModes = this.props.gameModes || []

    return (
      <div>
        <h2>Time to mock interview</h2>
        <h4>Select your options</h4>
          <Form inputModules={inputModules} onSubmit={this.props.onSubmit}/>
      </div>
    )
  }
}
