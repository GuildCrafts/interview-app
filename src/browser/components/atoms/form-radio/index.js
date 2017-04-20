import React,{Component} from 'react'

export default class FormRadio extends Component {
  constructor(props) {
    super(props)
    FormRadio.increment()
    this.state = {
      input: null
    }
  }

  static increment() {
    FormRadio.staticIterator++
  }

  static get iterator() {
    return FormRadio.staticIterator
  }

  render() {
    const changeHandler = (event) => {
      let currentState = this.state
      currentState.input = event.target.value
      this.setState( currentState )
      this.props.onChange( this.props.tag, this.state.input )
    }

    const radio = this.props.options.map( (option, index) => {
      const optionId = this.props.prompt+'-'+option.split(' ').join('-')
      const optionLabel = ' '+option
      const iteration = FormRadio.iterator
      return (
        <div key = {index} className="uk-form-controls uk-form-controls-text">
          <label>
            <input className="uk-radio" id={optionId} type="radio" name={iteration} value={option} onChange={changeHandler}/>
            {optionLabel}
          </label>
        </div>
      )
    })

    const prompt = this.props.prompt
    return (
      <div className="uk-margin">
        <div className="uk-form-label">{prompt}</div>
        {radio}
      </div>
    )
  }
}

FormRadio.staticIterator = 0
