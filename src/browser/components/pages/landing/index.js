import React, {Component} from 'react'
import QueryString from 'query-string'
import {uniq, flatMap, take, shuffle} from 'lodash'

import Game from '../game/index'
import GameOptions from '../../molecules/game-options/index'
import questions from '../../../../../data/questions.json'
import Header from '../../molecules/header/index'

require('../../../../../public/stylesheets/uikit.min.css')

const findTopicsAndDifficulty = () => {
  const topics = uniq(flatMap(questions.map(question => question.topics))).sort()
  const difficulty = uniq(questions.map(question => question.difficulty)).sort()
  return {topics: ['any'].concat(topics), difficulty: ['any'].concat(difficulty)}
}

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
  constructor() {
    super()
    this.state = {difficulty: null, topic: null}
    this.updateState = this.updateState.bind(this)
  }

  updateState(state) {
    this.setState(state)
  }

  render() {
    const parsed = QueryString.parse(this.props.location.search)
    const topicsAndDifficulty = findTopicsAndDifficulty()
    const filteredQuestions = filterQuestions(questions, this.state.topic, this.state.difficulty)

    const content = (this.state.difficulty && this.state.topic) ?
          <Game questions={filteredQuestions}/>
          : <GameOptions onSubmit={this.updateState} {...topicsAndDifficulty}
          parse={parsed} />

    const fakeStats = {
      experience: {value: 100, heading: "Experience"},
      difficulty: {value: "Beginner", heading: "Difficulty"}
    }

    const fakeProfile = {
      profileName: {value: "Murphy"},
      topic: {value: "JavaScript"},
      gameMode: {value: "Speaking"}
    }

    return (
      <div className="uk-container">
        <Header stats={fakeStats} profile={fakeProfile} />
        <div className="uk-card uk-card-default uk-card-body uk-width-1-1 uk-padding">
          {content}
        </div>
      </div>
    )
  }
}
