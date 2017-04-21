import React, {Component} from 'react'
import FormSelect from '../../atoms/form-select/index'

export default class GameOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {difficulty: this.props.parse.difficulty || null, topic: this.props.parse.topic || null}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
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
        <form className="uk-form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">

            <FormSelect options={difficulty} prompt="Difficulty:" tag="difficulty" onChange={this.handleChange.bind(this)} initValue={this.state.difficulty} />
            <FormSelect options={topics} prompt="Topic:" tag="topic" onChange={this.handleChange.bind(this)} initValue={this.state.topic} />
            <FormSelect options={gameModes} prompt="Game Mode:" tag="gameMode" onChange={this.handleChange.bind(this)} />

          </fieldset>
          <button className="uk-button uk-button-primary" >Submits</button>
        </form>
      </div>
    )
  }
}
