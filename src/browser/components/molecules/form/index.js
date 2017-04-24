import React, {Component} from 'react'
import flex from 'react-uikit-flex'

import FormCheckbox from '../../atoms/form-checkbox'
import FormRadio from '../../atoms/form-radio/index'
import FormSelect from '../../atoms/form-select/index'
import FormInput from '../../atoms/form-input/index'
import FormHints from '../../atoms/form-hints/index'

// Implementation:
/*

const inputModules = [
  {
    "type"       : "Input",
    "placeholder": "What is the meaning of life, the universe, and everything?",
    "prompt"     : "What Is Your Question?"
  },
  {
    "type"            : "Select",
    "options"         : ["1","262","42","9"],
    "prompt"          : "What Is The Answer?",
    "isOptionRequired": false
  },
  {
    "type"   : "Checkbox",
    "options": ["Core-JavaScript","Functional-Programming"],
    "prompt" : "Topic"
  },
  {
    "type"   : "Radio",
    "options": ["Beginner", "Intermediate", "Advanced", "Jedi"],
    "prompt" : "Difficulty Levels"
  }
]

<Form inputModules={inputModules} />

*/

export default class Form extends Component{
  constructor(props){
    super(props)
    this.state = {
      input: {},
      inputModules: props.inputModules
    }
  }

  buildJSX() {
    const form = this.state.inputModules.map( inputModule => {
      return {'Input': this.initTextInput.bind(this, inputModule),
        'Checkbox': this.initCheckbox.bind(this, inputModule),
        'Radio': this.initRadio.bind(this, inputModule),
        'Select': this.initSelect.bind(this, inputModule),
        'Hint': this.initHints.bind(this, inputModule)
      }[inputModule.type]()
    })
    this.setState({form: form})
  }

  componentDidMount(){
    this.buildJSX()
  }

  componentWillReceiveProps(){
    this.buildJSX()
  }

  updateInput( tag, data ){
    let currentState = this.state
    currentState.input[tag] = data
    this.setState( currentState )
  }

  initTextInput(inputModule) {
    let domElement = (<FormInput
      prompt={inputModule.prompt}
      placeholder={inputModule.placeholder}
      tag={inputModule.tag}
      onChange={this.updateInput.bind(this)}/>
    )

    let currentState = this.state
    currentState.input[inputModule.tag] = ""
    this.setState( currentState )
    return domElement
  }

  initHints(inputModule) {
    let domElement = (<FormHints
      prompt={inputModule.prompt}
      placeholder={inputModule.placeholder}
      tag={inputModule.tag}
      onChange={this.updateInput.bind(this)}/>
    )

    let currentState = this.state
    currentState.input[inputModule.tag] = []
    this.setState( currentState )
    return domElement
  }

  initCheckbox(inputModule) {
    let domElement = (<FormCheckbox
      prompt={inputModule.prompt}
      options={inputModule.options}
      tag={inputModule.tag}
      onChange={this.updateInput.bind(this)}/>)

    let currentState = this.state
    currentState.input[inputModule.tag] = []
    this.setState( currentState )
    return domElement
  }

  initRadio(inputModule) {
    let domElement = (<FormRadio
      prompt={inputModule.prompt}
      options={inputModule.options}
      tag={inputModule.tag}
      onChange={this.updateInput.bind(this)}
      />)

    let currentState = this.state
    currentState.input[inputModule.tag] = null
    this.setState( currentState )
    return domElement
  }

  initSelect(inputModule) {
    let domElement = (
      <FormSelect
      prompt={inputModule.prompt}
      options={inputModule.options}
      isOptionRequired={inputModule.isOptionRequired}
      onChange={this.updateInput.bind(this) }
      tag={inputModule.tag}
      passId={inputModule.id}
      />)
    let currentState = this.state
    currentState.input[inputModule.tag] = inputModule.options[0]
    this.setState( currentState )
    return domElement
  }

  handleSubmit(){
    //pass NewQuestionOutput(this.state.input) into the route
    this.props.onSubmit(this.state.input)
  }

//<button className="uk-button uk-button-primary" type="submit" onClick={this.props.onSubmitHandler.bind(this, this.state.input)}>Save</button>
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
