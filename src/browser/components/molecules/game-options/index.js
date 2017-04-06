import React, {Component} from 'react'
import SelectTag from '../../atoms/select-tag/index'

export default class GameOptions extends Component {
  constructor() {
    super()
    this.state = {level: null, tag: null}
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
    const tags = this.props.tags || []
    const levels = this.props.levels || []
    const gameModes = this.props.gameModes || []
    return (
      <div>
        <h2>Time to mock interview</h2>
        <h4>Select your options</h4>
        <form className="uk-form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <SelectTag options={levels} label="Level:" onChange={this.handleChange.bind(this, 'level')} />
            <SelectTag options={tags} label="Tag:" onChange={this.handleChange.bind(this, 'tag')} />
            <SelectTag options={gameModes} label="Game Mode:" onChange={this.handleChange.bind(this, 'gameMode')} />
          </fieldset>
          <button className="uk-button uk-button-primary" >Submits</button>
        </form>
      </div>
    )
  }
}
