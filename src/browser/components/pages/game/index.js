import React, {Component} from 'react';
import Scorecard from '../../molecules/scorecard/index'
import questions from '../../../../../data/questions.json'

export default class Game extends Component {
  constructor() {
    super()
    this.state = {questions: questions || [],
                  currentQuestionPosition: 0,
                  answered: [],
                  skipped: [],
                  showAnswer: false}
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
    console.log('entered', property, !this.state[property])
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
      <h3 className="uk-align-center"> All Done!</h3>
    )
  }

  render() {
    const {questions, currentQuestionPosition} = this.state
    const question = questions[currentQuestionPosition]

    let content

    if(currentQuestionPosition === questions.length) {
      content = this.allQuestionsCompletedJSX()
    } else {
      content = this.questionJSX(question)
    }

    return (
      <div className="uk-container">
        <div className="uk-card uk-card-default uk-card-body uk-width-1-1 uk-padding">
          <Scorecard answered={this.state.answered} skipped={this.state.skipped} questions={this.state.questions} />
          <progress className="uk-progress" value={currentQuestionPosition + 1} max={questions.length}></progress>
          {content}
          <hr className="uk-divider-icon" />
        </div>
      </div>
    )
  }
}
