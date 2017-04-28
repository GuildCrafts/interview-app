import React, {Component} from 'react'

export default class FormSelect extends Component {
  constructor(props){
    super(props)
  }

  changeHandler(event){
    this.props.onChange( this.props.tag, event.target.value )
  }

  render() {
    const options = this.props.options.map((option, index) => {
      return (<option key={index} value={option}>{option}</option>)
    })

    if (this.props.chooseSelect !== "") {
      for (let i = 0; i < options.length; i++) {
        if (this.props.chooseSelect === this.props.options[i]) {
          options[i] = (<option key={i} value={options[i]} selected>{options[i]}</option>)
        }
      }
    }

    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{this.props.prompt}</label>
        <div className="uk-form-controls">
          <select id={this.props.prompt} className="uk-select form-horizontal-select" onChange={this.changeHandler.bind(this)}>
            {options}
          </select>
        </div>
      </div>
    )
  }
}
