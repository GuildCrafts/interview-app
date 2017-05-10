import React, {Component} from 'react'
import flex from 'react-uikit-flex'

import FormCheckbox from '../../atoms/form-checkbox'
import FormRadio from '../../atoms/form-radio/index'
import FormSelect from '../../atoms/form-select/index'
import FormInput from '../../atoms/form-input/index'
import FormTextArea from '../../atoms/form-textarea/index'
import FormHints from '../../atoms/form-hints/index'

export default class Form extends Component{
  constructor(props){
    super(props)
    this.state = {
      input: Object.assign({}, this.props.initialValue) || {},
      inputModules: props.inputModules
    }
  }

  componentWillReceiveProps(nextProps){
    const nextInitialValue = nextProps.initialValue || {}
    const questionClone = JSON.parse(JSON.stringify( nextInitialValue ))
    this.setState({input: questionClone || {}})
  }

  updateInput( tag, data ){
    let currentState = this.state
    currentState.input[tag] = data
    this.setState(currentState)
  }

  initTextInput(inputModule, index) {
    let value = this.state.input[inputModule.tag] || ""
    let domElement = (
      <FormInput
        key={`form-element-${index}`}
        {...inputModule}
        value={value}
        onChange={this.updateInput.bind(this)}
      />
    )
    return domElement
  }

  initTextArea(inputModule, index) {
    let value = this.state.input[inputModule.tag] || ""
    let domElement = (
        <FormTextArea
      key={`form-element-${index}`}
      {...inputModule}
      value={value}
      onChange={this.updateInput.bind(this)}
        />
    )
    return domElement
  }


  initHints(inputModule, index) {
    let hints = this.state.input[inputModule.tag] || []
    let domElement = (
      <FormHints
        key={`form-element-${index}`}
        onChange={this.updateInput.bind(this)}
        hints={hints}
        {...inputModule}
      />
    )
    return domElement
  }

  initCheckbox(inputModule, index) {
    let checked = this.state.input[inputModule.tag] || []
    let domElement = (
      <FormCheckbox
        key={`form-element-${index}`}
        {...inputModule}
        checked={checked}
        onChange={this.updateInput.bind(this)}
      />
    )
    return domElement
  }

  initRadio(inputModule, index) {
    let checked = this.state.input[inputModule.tag] || ""
    let domElement = (
      <FormRadio
        key={`form-element-${index}`}
        checked={checked}
        {...inputModule}
        onChange={this.updateInput.bind(this)}
      />
    )
    return domElement
  }

  initSelect(inputModule, index) {
    let chooseSelect = this.state.input[inputModule.tag] || ""
    let domElement = (
      <FormSelect
        key={`form-element-${index}`}
        onChange={this.updateInput.bind(this) }
        chooseSelect={chooseSelect}
        {...inputModule}
      />
    )
    return domElement
  }

  handleSubmit(){
    this.props.onSubmit(this.state.input)
  }

  render(){
    const jsx = this.props.inputModules.map( (inputModule, index) => {
      return {'Input': this.initTextInput.bind(this, inputModule, index),
              'TextArea': this.initTextArea.bind(this, inputModule, index),
              'Checkbox': this.initCheckbox.bind(this, inputModule, index),
              'Radio': this.initRadio.bind(this, inputModule, index),
              'Select': this.initSelect.bind(this, inputModule, index),
              'Hint': this.initHints.bind(this, inputModule, index)
             }[inputModule.type]()
    })

    return(
      <div>
        <form className="uk-form-horizontal uk-margin-large">
          {jsx}
        </form>

        <p className="uk-text-right">
          <button onClick={this.handleSubmit.bind(this)} className="uk-button uk-button-primary uk-modal-close" type="submit">Submit</button>
        </p>
      </div>
    )
  }
}
