import React, {Component} from 'react';
import flex from 'react-uikit-flex'

import Scorecard from '../../molecules/scorecard/index'
import questions from '../../../../../data/questions.json'
require('../../../../../public/stylesheets/uikit.min.css')

export default class ApprovalPage extends Component {
  constructor() {
    super()
    this.state = {questions}
  }

  renderQuestions(){
    return (
      this.state.questions.map((question, index) => {
        return (
          <div>
            <button className="uk-button uk-button-default uk-margin-small-right" type="button" data-uk-toggle="target: #modal-example">{question.question}</button>
              <div id="modal-example" data-uk-modal>
                <div className="uk-modal-dialog uk-modal-body">
                  <h2 className="uk-modal-title uk-text-center">Approve Question</h2>
                  <p>laborum.</p>
                  <form method="post" action="/questions" className="uk-form-horizontal uk-margin-large">
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
              <button className="uk-button-small uk-button-danger" type="button">Delete this question</button>
          </div>
        )
      })
    )
  }
  render() {
    let content = this.renderQuestions()
    console.log(content)
    return (
      <div>Click to edit the following questions:
        <br></br>
        {content}
      </div>
    )
  }
}


// When individual question is clicked, modal opens
// When modal opens, question properties populate (read)
// When edit button is selected, question form becomes editable (update)
