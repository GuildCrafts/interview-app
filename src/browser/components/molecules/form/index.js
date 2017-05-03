import React, {Component} from 'react'
import flex from 'react-uikit-flex'

import FormCheckbox from '../../atoms/form-checkbox'
import FormRadio from '../../atoms/form-radio/index'
import FormSelect from '../../atoms/form-select/index'
import FormInput from '../../atoms/form-input/index'
import FormHints from '../../atoms/form-hints/index'

export default class Form extends Component{
  constructor(props){
    super(props)
    this.state = {
      input: {},
      inputModules: props.inputModules
    }
  }

  buildJSX() {
    const form = this.state.inputModules.map( (inputModule, index) => {
      return {'Input': this.initTextInput.bind(this, inputModule, index),
        'Checkbox': this.initCheckbox.bind(this, inputModule, index),
        'Radio': this.initRadio.bind(this, inputModule, index),
        'Select': this.initSelect.bind(this, inputModule, index),
        'Hint': this.initHints.bind(this, inputModule, index)
      }[inputModule.type]()
    })
    this.setState({form: form})
  }

  componentWillReceiveProps(){
    this.buildJSX()
  }

  updateInput( tag, data ){
    let currentState = this.state
    currentState.input[tag] = data
    this.setState( currentState )
  }

  initTextInput(inputModule, index) {
    let domElement = (
      <FormInput
        key={`form-element-${index}`}
        prompt={inputModule.prompt}
        placeholder={inputModule.placeholder}
        tag={inputModule.tag}
        value={inputModule.value}
        onChange={this.updateInput.bind(this)}
      />
    )

    let currentState = this.state
    currentState.input[inputModule.tag] = ""
    this.setState( currentState )
    return domElement
  }

  initHints(inputModule, index) {
    let domElement = (
      <FormHints
        key={`form-element-${index}`}
        prompt={inputModule.prompt}
        placeholder={inputModule.placeholder}
        tag={inputModule.tag}
        onChange={this.updateInput.bind(this)}
      />
    )

    let currentState = this.state
    currentState.input[inputModule.tag] = []
    this.setState( currentState )
    return domElement
  }

  initCheckbox(inputModule, index) {
    let domElement = (
      <FormCheckbox
        key={`form-element-${index}`}
        prompt={inputModule.prompt}
        options={inputModule.options}
        tag={inputModule.tag}
        checked={inputModule.checked}
        onChange={this.updateInput.bind(this)}
      />
    )

    let currentState = this.state
    currentState.input[inputModule.tag] = []
    this.setState( currentState )
    return domElement
  }

  initRadio(inputModule, index) {
    let domElement = (
      <FormRadio
        key={`form-element-${index}`}
        prompt={inputModule.prompt}
        options={inputModule.options}
        tag={inputModule.tag}
        checked={inputModule.checked}
        onChange={this.updateInput.bind(this)}
      />
    )

    let currentState = this.state
    currentState.input[inputModule.tag] = null
    this.setState( currentState )
    return domElement
  }

  initSelect(inputModule, index) {
    let domElement = (
      <FormSelect
        key={`form-element-${index}`}
        prompt={inputModule.prompt}
        options={inputModule.options}
        isOptionRequired={inputModule.isOptionRequired}
        onChange={this.updateInput.bind(this) }
        tag={inputModule.tag}
        passId={inputModule.id}
        chooseSelect={inputModule.chooseSelect}
      />
    )

    let currentState = this.state
    currentState.input[inputModule.tag] = inputModule.options[0]
    this.setState( currentState )
    return domElement
  }

  handleSubmit(){
    console.log("This.state.input", this.state.input)
    this.props.onSubmit(this.state.input)
  }

  render(){
    return(
      <div>
        <form className="uk-form-horizontal uk-margin-large">
          {this.state.form}
        </form>
        <p className="uk-text-right">
          <button onClick = {this.handleSubmit.bind(this)} className="uk-button uk-button-primary uk-modal-close" type="submit">Submit</button>
        </p>
      </div>
    )
  }
}
