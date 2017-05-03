import React,{Component} from 'react'

export default class FormCheckbox extends Component {
  constructor(props) {
    super(props)
    let checkedOptionObject = this.updateCheckedOptions(this.props.checked || [])
    this.state = {checked: checkedOptionObject}
  }

  componentWillReceiveProps(nextProps) {
    let newCheckedOptions = this.updateCheckedOptions(nextProps.checked)
    this.setState({
      checked: newCheckedOptions
    })
  }

  updateCheckedOptions(checkedOptions) {
    if(!checkedOptions) return {}
    return checkedOptions.reduce(function(acc, checkedOption) {
      acc[checkedOption] = true
      return acc
    },
     {})
  }

  changeHandler(event){
    let currentCheckedState = this.state.checked
    currentCheckedState[event.target.id] = !currentCheckedState[event.target.id]

    this.setState({checked: currentCheckedState})
    this.props.onChange( this.props.tag, Object.keys(currentCheckedState).filter(topic => currentCheckedState[topic]))
    console.log('inside changeHandler', this.state.checked);
  }

  render() {
    const checklist = this.props.options.map( (option, index) => {
      const optionLabel = ' '+option
      const currentOption = this.props.options[index]
      if (this.state.checked && ! this.state.checked[currentOption]) {
        return (
          <div key = {index} className="uk-form-controls uk-form-controls-text">
            <label>
              <input ref={option} key={`checkbox-${option}`} className="uk-checkbox"
                 id={option} type="checkbox" name={this.props.tag}
                 onChange={this.changeHandler.bind(this)} checked={false}/>
              {optionLabel}
            </label>
          </div>
        )
      } else {
        return (
          <div key = {index} className="uk-form-controls uk-form-controls-text">
            <label>
              <input ref={option} key={`checkbox-${option}`} className="uk-checkbox"
                 id={option} type="checkbox" name={this.props.tag}
                 onChange={this.changeHandler.bind(this)} checked={true}/>
              {optionLabel}
            </label>
          </div>
        )
      }
    })

    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{this.props.prompt}</label>
          {checklist}
      </div>
    )
  }
}
