import React, {Component} from 'react'
import flex from 'react-uikit-flex'
import FormCheckbox from '../../atoms/form-checkbox'
import FormRadio from '../../atoms/form-radio/index'
import FormSelect from '../../atoms/form-select/index'
import FormInput from '../../atoms/form-input/index'
import NewQuestionOutput from '../../middleware/new-question-output/index'

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
      input: {}
    }
  }

  parseName(inputModule, option){
    return inputModule.prompt+'-'+option.split(' ').join('-')
  }

  handleChange(args, event) {
    let property = args.property
    let isCheckbox = args.isCheckbox
    if(isCheckbox) {
      let currentState = this.state
      currentState.input[property] = event.target.checked
      this.setState(currentState)
    } else {
      let currentState = this.state
      currentState.input[property] = event.target.value
      this.setState(currentState)
    }
    console.log(this.state.input)
  }

  initTextInput(inputModule) {
    let domElement = (<FormInput
      prompt={inputModule.prompt}
      placeholder={inputModule.placeholder}
      onChange={this.handleChange.bind(this)}/>
    )

    let currentState = this.state
    currentState.input[inputModule.prompt] = ''
    this.setState( currentState )
    return domElement
  }

  initCheckbox(inputModule) {
    let domElement = (<FormCheckbox
      prompt={inputModule.prompt}
      options={inputModule.options}
      onChange={this.handleChange.bind(this)}/>)

    let currentState = this.state
    inputModule.options.forEach( option => {
      currentState.input[this.parseName(inputModule, option)] = false
    })
    this.setState( currentState )
    return domElement
  }

  initRadio(inputModule) {
    let domElement = (<FormRadio
      prompt={inputModule.prompt}
      options={inputModule.options}
      onChange={this.handleChange.bind(this)}
      />)
    let currentState = this.state

    currentState.input[inputModule.prompt] = inputModule.options[0]
    this.setState( currentState )
    return domElement
  }

  initSelect(inputModule) {
    let domElement = (
      <FormSelect
      prompt={inputModule.prompt}
      options={inputModule.options}
      isOptionRequired={inputModule.isOptionRequired}
      onChange={this.handleChange.bind(this) }
      passId={inputModule.id}
      />)
    let currentState = this.state
    currentState.input[inputModule.prompt] = inputModule.options[0]
    this.setState( currentState )
    return domElement
  }

  componentDidMount() {
    const form = this.props.inputModules.map( inputModule => {
      return {'Input': this.initTextInput.bind(this, inputModule),
        'Checkbox': this.initCheckbox.bind(this, inputModule),
        'Radio': this.initRadio.bind(this, inputModule),
        'Select': this.initSelect.bind(this, inputModule)
      }[inputModule.type]()
    })
    this.setState({form: form})
  }

  addHint(){
    let currentState = this.state
    let hint = "Hint " + ( Object.keys(this.state.form).length - 4 )
    currentState.form.push(
      <FormInput
        prompt={hint}
        placeholder="Add a usefull hint"
        onChange={this.handleChange.bind(this)}/>
    )
    this.setState( currentState )
  }

  handleSubmit(){
    //pass NewQuestionOutput(this.state.input) into the route
  }

  render(){
    return(
      <div>
        <form className="uk-form-horizontal uk-margin-large">
          {this.state.form}
        </form>

        <p className="uk-text-right">
          <button onClick = {this.addHint.bind(this)} className="uk-button uk-button-default" type="button">Add Hint</button>
          <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
          <button onClick = {this.handleSubmit.bind(this)} className="uk-button uk-button-primary" type="submit">Submit</button>
        </p>
      </div>
    )
  }
}
