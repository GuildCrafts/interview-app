import React,{Component} from 'react'

export default class FormInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputState: this.props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inputState: nextProps.value
    })
  }

  changeHandler(event){
    this.setState({inputState: event.target.value})
    this.props.onChange( this.props.tag, event.target.value )
  }

  render() {
    return (
      <div key={this.props.prompt} className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-text">{this.props.prompt}</label>
        <div className="uk-form-controls">
          <input value={this.state.inputState} className="uk-input form-horizontal-text"
          type="text" id={this.props.prompt} placeholder={this.props.placeholder}
           onChange={this.changeHandler.bind(this)} />
        </div>
      </div>
    )
  }
}
