import React, {Component} from 'react'

export default class FormSelect extends Component {
  changeHandler(event){
    this.props.onChange( this.props.tag, event.target.value )
  }

  render() {
    const options = this.props.options.map((option, index) => {
      if(option === this.props.chooseSelect){
        return (<option key={index} value={option} selected>{option}</option>)
      }else{
        return (<option key={index} value={option}>{option}</option>)
      }
    })

    let promptOption = this.props.showPrompt ? <option value="">Please Select</option> : null

    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{this.props.label}</label>
        <div className="uk-form-controls">
          <select id={this.props.label} className="uk-select form-horizontal-select" onChange={this.changeHandler.bind(this)}>
            {promptOption}
            {options}
          </select>
        </div>
      </div>
    )
  }
}
