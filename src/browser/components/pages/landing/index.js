import React, {Component} from 'react';
import {uniq, flatMap, take, shuffle} from 'lodash'

import Game from '../game/index'
import GameOptions from '../../molecules/game-options/index'
import questions from '../../../../../data/questions.json'
import Header from '../../molecules/header/index'

// require('../../../../../public/stylesheets/uikit.min.css')

const findTagsAndLevels = () => {
  const tags = uniq(flatMap(questions.map(question => question.tags))).sort()
  const levels = uniq(questions.map(question => question.level)).sort()
  return {tags: ['any'].concat(tags), levels: ['any'].concat(levels)}
}

const filterQuestions = (questions, tag, level) => {
  let q = shuffle(questions)
  if(tag === 'any' && level === 'any') {
    return take(q, 7)
  } else if( tag === 'any') {
    return q.filter(question => question.level === level)
  } else if (level === 'any') {
    return q.filter(question => question.tags.includes(tag))
  } else {
    return q.filter(question => question.level === level &&  question.tags.includes(tag))
  }
}

export default class Landing extends Component {
  constructor() {
    super()
    this.state = {level: null, tag: null}
    this.updateState = this.updateState.bind(this)
  }

  updateState(state) {
    this.setState(state)
  }

  render() {
    const tagsAndLevels = findTagsAndLevels()
    const filteredQuestions = filterQuestions(questions, this.state.tag, this.state.level)

    const content = (this.state.level && this.state.tag) ?
          <Game questions={filteredQuestions}/>
          : <GameOptions onSubmit={this.updateState} {...tagsAndLevels}/>

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
