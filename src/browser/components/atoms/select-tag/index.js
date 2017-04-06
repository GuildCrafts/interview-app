import React, {Component} from 'react'

export default class SelectTag extends Component {
  render() {
    const options = this.props.options.map((option, index) => <option key={index} value={option}>{option}</option>)
    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{this.props.label}</label>
        <div className="uk-form-controls">
          <select className="uk-select" id="form-horizontal-select" onChange={this.props.onChange} value={this.props.initValue}>
            <option value="">Please Select</option>
            {options}
          </select>
        </div>
      </div>

    )
  }
}
