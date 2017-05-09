import React, {Component} from 'react';
import flex from 'react-uikit-flex'
import { Link } from 'react-router-dom'

import Scorecard from '../../molecules/scorecard/index'
import Requests from '../../common/requests.js'
require('../../../../../public/stylesheets/uikit.min.css')

const inputModules = [
  {
    "type"    : "Select",
    "label "  : "Difficulty",
    "options" : ["any","beginner","intermediate"],
    "tag"     : "level",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "label"  : "Topic",
    "options" : [],
    "tag"     : "topic",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "label"  : "Game Mode",
    "options" : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"     : "game_mode",
    "isOptionRequired": true
  }
]

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {currentQuestionPosition: 0,
                  answered: [],
                  skipped: [],
                  showAnswer: false,
                  questions: props.questions}
  }

  incrementQuestionState(property) {
    let questions = this.state[property]
    questions.push(this.state.currentQuestionPosition)
    this.setState({[property]: questions,
                   currentQuestionPosition: this.state.currentQuestionPosition + 1})
  }

  answerJSX(question) {
    if (this.state.showAnswer) {
      return (<div className="uk-placeholder" id="answer-container">{question.answer}</div>)
    }
    return null
  }

  toggleProperty(property) {
    this.setState({[property]: !this.state[property]})
  }

  endGame() {
    Requests.post('/api/interviews/', this.state)
    location.reload()
  }

  questionJSX(question) {
      return (
        <div>
          <div className="uk-card-title uk-animation-fade uk-placeholder">{question.question}</div>

          <div className="uk-flex uk-grid">
            <div className="uk-flex-first">
              <button className="uk-button uk-button-primary"
                      onClick={this.incrementQuestionState.bind(this, 'answered')}>Correct</button>
            </div>
            <div className="uk-flex">
              <button className="uk-button uk-button-danger"
                      onClick={this.incrementQuestionState.bind(this, 'skipped')}>Skip</button>
            </div>
            <div className="uk-flex">
              <button className="uk-button-secondary uk-button" onClick={this.toggleProperty.bind(this, 'showAnswer')}>Show Answer</button>
            </div>
          </div>
          {this.answerJSX(question)}
        </div>
      )
  }

  allQuestionsCompletedJSX() {
    return (
      <div>
        <button className="uk-button-secondary uk-button uk-width-1-1" onClick={this.endGame.bind(this)}>
          Finish Interview and Submit Notes!
        </button>
      </div>
    )
  }

  hintButton(question) {
    const hints = question.hints.map( hint => {
      return (
        <p>{hint}</p>
      )
    })

    return (
      <div>
        <button className="uk-button uk-button-default" type="button" data-uk-toggle="target: #toggle-animation-multiple; animation:  uk-animation-slide-left, uk-animation-slide-bottom queued: true; duration: 500">Show Hints!</button>
        <div id="toggle-animation-multiple" className="uk-card uk-card-default uk-card-body uk-margin-small" hidden>
          {hints}
        </div>
      </div>
    )
  }

  updateFeedback( event ){
    this.setState({feedback: event.target.value})
  }

  render() {
    const questions = this.props.questions
    const {currentQuestionPosition} = this.state
    const question = questions[currentQuestionPosition]

    let content, hints

    if(currentQuestionPosition === questions.length) {
      hints = ""
    } else (
      hints = this.hintButton(question)
    )

    if(currentQuestionPosition === questions.length) {
      content = this.allQuestionsCompletedJSX()
    } else {
      content = this.questionJSX(question)
    }

    return (
      <div>
        <Scorecard answered={this.state.answered} skipped={this.state.skipped} questions={this.props.questions} />
        <progress className="uk-progress" value={currentQuestionPosition + 1} max={questions.length}></progress>
        {content}
        <div className="uk-container-center uk-margin uk-width-1-1">
          <textarea className="uk-textarea" placeholder="Submit your interview notes here..." onChange={this.updateFeedback.bind(this)}></textarea>
        </div>
        {hints}
      </div>
    )
  }
}
