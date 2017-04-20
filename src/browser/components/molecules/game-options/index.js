import React, {Component} from 'react'
import FormSelect from '../../atoms/form-select/index'

export default class GameOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {difficulty: this.props.parse.difficulty || null, topic: this.props.parse.topic || null}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(property, event) {
    this.setState({[property]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state)
  }

  render() {
    const topics = this.props.topics || []
    const difficulty = this.props.difficulty || []
    const gameModes = this.props.gameModes || []

    return (
      <div>
        <h2>Mock Interview</h2>
        <h4>Select your options</h4>
        <form className="uk-form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">

            <FormSelect options={difficulty} prompt="Difficulty:" onChange={this.handleChange.bind(this, 'difficulty')} initValue={this.state.difficulty} />
            <FormSelect options={topics} prompt="Topic:" onChange={this.handleChange.bind(this, 'topic')} initValue={this.state.topic} />
            <FormSelect options={gameModes} prompt="Game Mode:" onChange={this.handleChange.bind(this, 'gameMode')} />

          </fieldset>
          <button className="uk-button uk-button-primary" >Start Interview</button>
        </form>
      </div>
    )
  }
}
