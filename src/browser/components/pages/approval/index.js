import React, {Component} from 'react';
import flex from 'react-uikit-flex'

import Scorecard from '../../molecules/scorecard/index'
import questions from '../../../../../data/questions.json'
import Header from '../../molecules/header/index'
import FormSelect from '../../atoms/form-select/index'
require('../../../../../public/stylesheets/uikit.min.css')

export default class ApprovalPage extends Component {
  constructor() {
    super()
    this.state = {questions}
    this.state.filter = "All"
  }

  onClick(index){
    let questArr = this.state.questions
    let place = index
    questArr.splice(this.refs[index], 1)
    this.setState({questions: questArr})
  }

  handleChange(property, event) {
    let targetValue = event.target.value
    if(targetValue === '') {
      targetValue = 'All'
    }
    this.setState({[property]: targetValue});
  }

  renderQuestions(){
    return (
      this.state.questions.map((question, index) => {
        let approvalState = this.state.filter
        if(approvalState === question.approval || approvalState === 'All') {

          index = "question" + index
          return (
            <div key = {index}>
              <button ref={index} className="uk-button uk-button-default uk-margin-small-right" type="button" data-uk-toggle="target:#modal-example">{question.question}</button>
                <div id="modal-example" data-uk-modal>
                  <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title uk-text-center">Approve Question</h2>
                    <p>laborum.</p>
                    <form method="put" action="/edit" className="uk-form-horizontal uk-margin-large">
                      <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Questions:</label>
                        <div className="uk-form-controls">
                          <input className="uk-input" id="form-horizontal-text" type="text" defaultValue={question.question} />
                        </div>
                      </div>
                      <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Answer:</label>
                        <div className="uk-form-controls">
                          <input className="uk-input" id="form-horizontal-text" type="text" defaultValue={question.answer} />
                        </div>
                      </div>
                      <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-horizontal-select">Topic:</label>
                        <div className="uk-form-controls">
                          <select className="uk-select" id="form-horizontal-select">
                            <option>core-javascript</option>
                            <option>functional-programming</option>
                          </select>
                        </div>
                      </div>
                      <div className="uk-margin">
                        <div className="uk-form-label">Difficulty Level:</div>
                        <div className="uk-form-controls uk-form-controls-text">
                          <label><input className="uk-radio" type="radio" name="radio1" /> Beginner</label><br></br>
                          <label><input className="uk-radio" type="radio" name="radio1" /> Intermediate</label><br></br>
                          <label><input className="uk-radio" type="radio" name="radio1" /> Advanced</label><br></br>
                          <label><input className="uk-radio" type="radio" name="radio1" /> Jedi</label>
                        </div>
                      </div>
                    <p className="uk-text-right">
                      <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                      <button className="uk-button uk-button-primary" type="submit">Save Edits</button>
                    </p>
                  </form>
                  </div>
                </div>
                <button className="uk-button-small uk-button-danger" onClick={this.onClick.bind(this, index)} ref={index} type="button">Delete this question</button>
            </div>
          )
        }
      })
    )
  }
  render() {
    const fakeStats = {
      experience: {value: 100, heading: "Experience"},
      difficulty: {value: "Beginner", heading: "Difficulty"}
    }

    const fakeProfile = {
      profileName: {value: "Murphy"},
      topic: {value: "JavaScript"},
      gameMode: {value: "Speaking"}
    }

    const filterArray = ['All', 'Approved', 'Pending']

    let content = this.renderQuestions()
    return (
      <div>Click to edit the following questions:
        // Drop down input
        <div><Header stats={fakeStats} profile={fakeProfile}/></div>
        <br></br>
        <FormSelect options={filterArray} label='Filter' onChange={this.handleChange.bind(this, 'filter')}/>
        <br></br>
        {content}
      </div>
    )
  }
}

// When individual question is clicked, modal opens
// When modal opens, question properties populate (read)
// When edit button is selected, question form becomes editable (update)
