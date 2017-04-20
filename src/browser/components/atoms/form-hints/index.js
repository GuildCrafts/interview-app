import React,{Component} from 'react'

export default class FormHints extends Component {
  constructor(props) {
    super()
    this.state = {
      hints: 0,
      form: [],
      input: {}
    }
  }

  changeHandler(event){
    let currentState = this.state
    currentState.input[event.target.id] = event.target.value
    this.setState(currentState)
    this.props.onChange( this.props.tag, Object.values(this.state.input) )
  }

  addHint(){
    let currentState = this.state
    let key = "hint"+currentState.hints++
    currentState.form.push(
      <div key={key} className="uk-margin">
        <div className="uk-form-controls">
          <input className="uk-input form-horizontal-text" type="text" id={key} placeholder={this.props.placeholder} onChange={this.changeHandler.bind(this)} />
        </div>
      </div>
    )
    this.setState(currentState)
  }

  render() {
    const prompt = this.props.prompt
    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{prompt}</label>
          {this.state.form}
          <button onClick = {this.addHint.bind(this)} className="uk-button uk-button-default" type="button">Add Hint</button>
      </div>
    )
  }
}
