import React,{Component} from 'react'

export default class FormInput extends Component {
  constructor() {
    super()
  }

  render() {
    return (
        <div className="uk-form-controls">
            <input className="uk-input" id="form-horizontal-text" type="text" placeholder="Here's a hint to help..." />
        </div>
    )
  }
}
