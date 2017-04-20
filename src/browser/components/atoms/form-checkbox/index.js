import React,{Component} from 'react'

export default class FormCheckbox extends Component {
  constructor(props) {
    super()
    this.state = {}
    props.options.forEach( option => {
      this.state[option] = false
    })
  }

  selectChecked(){
    return Object.keys(this.state).filter( option => {
      return this.state[option]
    })
  }

  changeHandler(event){
    let currentState = this.state
    currentState[event.target.id] = event.target.checked
    this.setState(currentState)
    this.props.onChange( this.props.tag, this.selectChecked() )
  }

  render() {
    const checklist = this.props.options.map( (option, index) => {
      const optionLabel = ' '+option
      
      return (
        <div key = {index} className="uk-form-controls uk-form-controls-text">
          <label>
            <input className="uk-checkbox" id={option} type="checkbox" name={this.props.tag} onChange={this.changeHandler.bind(this)}/>
            {optionLabel}
          </label>
        </div>
      )
    })

    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{this.props.prompt}</label>
          {checklist}
      </div>
    )
  }
}
