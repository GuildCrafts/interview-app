import React,{Component} from 'react'

export default class FormRadio extends Component {

  changeHandler(event){
    return this.props.onChange( this.props.tag, event.target.value )
  }

  render() {
    const radio = this.props.options.map( (option, index) => {
      const optionLabel = ' '+option
      if(this.props.checked === option){
        return (
          <div key={index} className="uk-form-controls uk-form-controls-text">
            <label>
              <input className="uk-radio" type="radio" name={this.props.tag} value={option} checked onChange={this.changeHandler.bind(this)}/>
              {optionLabel}
            </label>
          </div>
        )
      }else{
        return (
          <div key={index} className="uk-form-controls uk-form-controls-text">
            <label>
              <input className="uk-radio" type="radio" name={this.props.tag} value={option} onChange={this.changeHandler.bind(this)}/>
              {optionLabel}
            </label>
          </div>
        )
      }
    })

    return (
      <div className="uk-margin">
        <div className="uk-form-label">{this.props.label}</div>
        {radio}
      </div>
    )
  }
}
