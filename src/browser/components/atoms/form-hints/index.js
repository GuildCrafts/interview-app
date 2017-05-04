import React,{Component} from 'react'

export default class FormHints extends Component {

  changeHandler(index, event){
    let hints = this.props.hints
    hints[index] = event.target.value
    this.props.onChange( this.props.tag, hints )
  }

  addHint(){
    let hints = this.props.hints
    hints.push('')
    this.props.onChange( this.props.tag, hints )
  }

  render() {
    const prompt = this.props.prompt
    const content = this.props.hints.map( (hint, index) => {
      return(
        <div className="uk-margin" key={index}>
          <div className="uk-form-controls">
            <input className="uk-input form-horizontal-text" type="text" id={index}
              placeholder={this.props.placeholder}
              onChange={this.changeHandler.bind(this, index)}
              value={this.props.hints[index]}/>
          </div>
        </div>
      )
    })

    return (
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">{prompt}</label>
          {content}
          <button onClick = {this.addHint.bind(this)} className="uk-button uk-button-default" type="button">Add Hint</button>
      </div>
    )
  }
}
