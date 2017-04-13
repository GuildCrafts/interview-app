import React,{Component} from 'react'

export default class FormCheckbox extends Component {
  constructor() {
    super()
  }


  render() {
    const checklist = this.props.options.map( (option, index) => {
      const optionId = this.props.prompt+'-'+option.split(' ').join('-')
      const optionLabel = ' '+option

      const changeHandler = (event) => {
        this.props.onChange({property: optionId, isCheckbox: true}, event)
      }

      return (
        <div key = {index} className="uk-form-controls uk-form-controls-text">
          <label>
            <input className="uk-checkbox" id={optionId} type="checkbox" name={optionId} onChange={changeHandler}/>
            {optionLabel}
          </label>
        </div>
      )
    })

    const prompt = this.props.prompt
    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{prompt}</label>
          {checklist}
      </div>
    )
  }
}
