import React,{Component} from 'react'

export default class FormRadio extends Component {
  constructor(props) {
    super(props)
    this.state = {options: this.props.options}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options
    })
  }

  changeHandler(event){
    this.setState({options: event.target.value})
    return this.props.onChange( this.props.tag, event.target.value )
  }

  render() {
    const radio = this.props.options.map( (option, index) => {
      const optionLabel = ' '+option
      return (
        <div key = {index} className="uk-form-controls uk-form-controls-text">
          <label>
            <input className="uk-radio" type="radio" name={this.props.tag} value={option} onChange={this.changeHandler.bind(this)}/>
            {optionLabel}
          </label>
        </div>
      )
    })

    if (this.props.checked !== "") {
      for (let i = 0; i < radio.length; i++) {
        if (this.props.checked === this.state.options[i]) {
          const optionLabel = ' '+this.state.options[i]
          radio[i] = (
            <div key={i} className="uk-form-controls uk-form-controls-text">
              <label>
                <input className="uk-radio" type="radio" name={this.props.tag} value={this.state.options[i]} onChange={this.changeHandler.bind(this)} checked/>
                {optionLabel}
              </label>
            </div>
          )
        }
      }
    }

    return (
      <div className="uk-margin">
        <div className="uk-form-label">{this.props.prompt}</div>
        {radio}
      </div>
    )
  }
}
