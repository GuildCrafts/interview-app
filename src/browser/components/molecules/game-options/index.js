import React, {Component} from 'react'
import {uniq, flatMap, take, shuffle} from 'lodash'

import Form from '../../molecules/form/index'
import Game from '../../pages/game/index'
import Request from '../../common/requests'
import inputModules from '../../common/game-options-template'


export default class GameOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {isForm: true, questions: {}}
    this.getQuestions = this.getQuestions.bind(this)
    this.filterQuestions = this.filterQuestions.bind(this)
  }

  componentDidMount() {
    Request.getDatabaseQuestions('/api/questions/').then(questions => {
      return questions
    })
    .then(question => {
      this.setState(Object.assign(this.state, {questions: question}))
    })
  }

  getQuestions(filters) {
    const filteredQuestions = this.filterQuestions(this.state.questions, filters.topic, filters.level)
    this.setState(prevState => ({
      isForm: false,
      questions: filteredQuestions
    }))
  }

  filterQuestions(questions, topic, difficulty) {
    let q = shuffle(questions)
    if(topic === 'any' && difficulty === 'any') {
      return take(q, 7)
    } else if( topic === 'any') {
      return q.filter(question => question.difficulty === difficulty)
    } else if (difficulty === 'any') {
      return q.filter(question => question.topics.includes(topic))
    } else {
      return q.filter(question => question.level === difficulty && question.topics === topic)
    }
  }

  // handleChange( tag, data ){
  //   this.setState( {[tag]: data} )
  // }

  render() {
    const topics = this.props.topics || []
    const difficulty = this.props.difficulty || []
    const gameModes = this.props.gameModes || []
    let correctElement
    if (this.state.isForm) {
      correctElement = <Form inputModules={inputModules} onSubmit={this.getQuestions.bind(this)} />
    }
    else if (!this.state.isForm) {
      correctElement = <Game questions={this.state.questions} />
    }
    return (
      <div>
        <h2>Mock Interview</h2>
        <h4>Select your options</h4>
        {correctElement}
      </div>
    )
  }
}
