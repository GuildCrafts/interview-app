import React,{Component} from 'react'

export default class FormCheckbox extends Component {

  changeHandler(event){
    this.props.onChange( this.props.tag, this.updateChecked( event.target.id) )
  }

  updateChecked( clicked ){
    if(this.props.checked.includes( clicked )){
      return this.props.checked.filter( option => option != clicked)
    }else{
      return this.props.checked.concat([clicked])
    }
  }

  render() {
    const checklist = this.props.options.map( (option, index) => {
      const optionLabel = ' '+option
      const currentOption = this.props.options[index]
      if (this.props.checked.includes(currentOption)) {
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
        <label className="uk-form-label" htmlFor="form-horizontal-select">{this.props.label}</label>
          {checklist}
      </div>
    )
  }
}
