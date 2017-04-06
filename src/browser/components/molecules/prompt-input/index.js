import React,{Component} from 'react'

import FormInput from '../../atoms/form-input/index'

export default class AddInput extends Component {
  constructor(props) {
    super(props)
    this.state = { inputs: ['input-0'] }
    this.addInput = this.addInput.bind(this)
  }

  render() {
    return (
      <div>
        <button className="uk-button uk-button-default" onClick={this.addInput}>
          Add a Hint
        </button>
        <div id="dynamicInput">
          {this.state.inputs.map(input => <FormInput key={input} />)}
        </div>
      </div>
    )
  }

  addInput(event) {
    event.preventDefault()
    let nextField = `input-${this.state.inputs.length}`
    this.setState({ inputs: this.state.inputs.concat([nextField]) })
  }
}
