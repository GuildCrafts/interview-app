import React,{Component} from 'react'

export default class FormCheckbox extends Component {
  constructor(props) {
    super(props)
    this.state = {checked: props.checked}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    })
  }

  changeHandler(event){
    this.props.onChange( this.props.tag, this.updateChecked(event.target.id) )
  }

  updateChecked( clicked ){
    if(this.state.checked.includes( clicked )){
      return this.state.checked.filter( option => option != clicked)
    }else{
      return this.state.checked.concat([clicked])
    }
  }

  render() {
    console.log('checkbox checked',this.state.checked)
    const checklist = this.props.options.map( (option, index) => {
      const optionLabel = ' '+option
      const currentOption = this.props.options[index]
      if (this.state.checked.includes(currentOption)) {
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
      } else {
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
