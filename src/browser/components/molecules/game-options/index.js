import React, {Component} from 'react'
import SelectTag from '../../atoms/select-tag/index'

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
        <h2>Time to mock interview</h2>
        <h4>Select your options</h4>
        <form className="uk-form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">

            <SelectTag options={difficulty} label="Difficulty:" onChange={this.handleChange.bind(this, 'difficulty')} initValue={this.state.difficulty} />
            <SelectTag options={topics} label="Topic:" onChange={this.handleChange.bind(this, 'topic')} initValue={this.state.topic} />
            <SelectTag options={gameModes} label="Game Mode:" onChange={this.handleChange.bind(this, 'gameMode')} />

          </fieldset>
          <button className="uk-button uk-button-primary" >Submits</button>
        </form>
      </div>
    )
  }
}
