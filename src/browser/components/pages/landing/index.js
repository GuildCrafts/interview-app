import React, {Component} from 'react'
import QueryString from 'query-string'
import {uniq, flatMap, take, shuffle} from 'lodash'

import Layout from '../layout/index'
import Game from '../game/index'
import GameOptions from '../../molecules/game-options/index'
import questions from '../../../../../data/questions.json'
import Header from '../../molecules/header/index'

require('../../../../../public/stylesheets/uikit.min.css')

const filterQuestions = (questions, topic, difficulty) => {
  let q = shuffle(questions)
  if(topic === 'any' && difficulty === 'any') {
    return take(q, 7)
  } else if( topic === 'any') {
    return q.filter(question => question.difficulty === difficulty)
  } else if (difficulty === 'any') {
    return q.filter(question => question.topics.includes(topic))
  } else {
    return q.filter(question => question.difficulty === difficulty &&  question.topics.includes(topic))
  }
}

export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {difficulty: null, topic: null}
    this.updateState = this.updateState.bind(this)
  }

  updateState(state) {
    this.setState(state)
  }

  render() {
    const parsed = QueryString.parse(this.props.location.search)
    const filteredQuestions = filterQuestions(questions, this.state.topic, this.state.difficulty)
    const content = (this.state.difficulty && this.state.topic) ?
          <Game questions={filteredQuestions} difficulty={this.state.difficulty} topics={this.state.topic}/>
          : <GameOptions onSubmit={this.updateState.bind(this)} topics={this.props.topics}
          parse={parsed} />

    return (
      <div className="uk-container">
        <Layout profile={this.props.profile} stats={this.props.stats}>
          {content}
        </Layout>
      </div>
    )
  }
}
