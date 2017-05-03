import React, {Component} from 'react';
import flex from 'react-uikit-flex'

import Scorecard from '../../molecules/scorecard/index'
import Requests from '../../common/requests.js'
require('../../../../../public/stylesheets/uikit.min.css')

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {currentQuestionPosition: 0,
                  answered: [],
                  skipped: [],
                  showAnswer: false,
                  questions: props.questions}
  }

  //Needs reasessment
  componentDidMount(){
    const {difficulty,topics} = this.props
    const topicsQueryString = topics.reduce( ( queryString, topic ) => {
      return queryString + `&topics=${topic}`
    },'')
    Requests.get(`/api/questions?difficulty=${difficulty}&${topicsQueryString}`)
    .then( questions => {
      this.setState(Object.assign(this.state, {questions}))
    })
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
        <button className="uk-button-secondary uk-button uk-width-1-1">
          Finish Interview and Submit Notes!
        </button>
      </div>
    )
  }


  render() {
    const questions = this.props.questions
    const {currentQuestionPosition} = this.state
    const question = questions[currentQuestionPosition]

    let content

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
          <textarea className="uk-textarea" placeholder="Submit your interview notes here..."></textarea>
        </div>
        <button className="uk-button uk-button-default" data-uk-toggle="target: #my-id" type="button">HINT!</button>
        <p id="my-id" hidden>Silly</p>
      </div>
    )
  }
}
