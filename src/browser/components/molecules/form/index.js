import React, {Component} from 'react'
import flex from 'react-uikit-flex'
import FormCheckbox from '../../atoms/form-checkbox'
import FormRadio from '../../atoms/form-radio/index'
import FormSelect from '../../atoms/form-select/index'
import FormInput from '../../atoms/form-input/index'

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

  render(){
    return(
      <form className="uk-form-horizontal uk-margin-large">
        {this.state.form}
      </form>
    )
  }
}
