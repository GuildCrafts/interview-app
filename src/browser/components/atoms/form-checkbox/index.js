import React,{Component} from 'react'

export default class FormCheckbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: this.props.options
    }
    props.options.forEach( option => {
      this.state[option] = false
    })
  }

    componentWillReceiveProps(nextProps) {
      this.setState({
        options: nextProps.options
      })
    }

  selectChecked(){
    return Object.keys(this.state).filter( option => {
      return this.state[option]
    })
  }

  changeHandler(event){
    console.log("This.State====>", this.state, event.target.value);
    this.setState({options: event.target.value})
    let currentState = this.state
    currentState[event.target.id] = event.target.checked
    this.setState(currentState)
    this.props.onChange( this.props.tag, this.selectChecked() )
  }

  render() {
    console.log('rerendering::');
    const checklist = this.state.options.map( (option, index) => {
      const optionLabel = ' '+option
      return (
        <div key = {index} className="uk-form-controls uk-form-controls-text">
          <label>
            <input className="uk-checkbox" id={option} type="checkbox" name={this.props.tag} onChange={this.changeHandler.bind(this)}/>
            {optionLabel}
          </label>
        </div>
      )
    })

    if (this.props.checked !== "") {
      for (let i = 0; i < checklist.length; i++) {
        if (this.props.checked === this.state.options[i]) {
          const optionLabel = ' '+this.state.options[i]
          const option = this.state.options[i]
          console.log('option::', option);
          checklist[i] = (
            <div key={i} className="uk-form-controls uk-form-controls-text">
              <label>
                <input className="uk-checkbox" id={option} type="checkbox" name={this.props.tag} onChange={this.changeHandler.bind(this)} checked={this.state[option]}/>
                {optionLabel}
              </label>
            </div>
          )
        }
      }
    }

    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{this.props.prompt}</label>
          {checklist}
      </div>
    )
  }
}
