import React, {Component} from 'react';
import Game from '../game/index'
import GameOptions from '../../molecules/game-options/index'
import questions from '../../../../../data/questions.json'
import {uniq, flatMap, take, shuffle} from 'lodash'

require('../../../../../public/stylesheets/uikit.min.css')

const findTagsAndLevels = () => {
  const tags = uniq(flatMap(questions.map(question => question.tags))).sort()
  const levels = uniq(questions.map(question => question.level)).sort()
  return {tags, levels}
}

const filterQuestions = (questions, tag, level) => {
  let q = shuffle(questions)
  console.log('questions::', q, tag, level)
  if(tag === 'all' && level === 'any') {
    console.log('entered 1')
    return take(q, 7)
  } else if( tag === 'all') {
    console.log('entered 2')
    return q.filter(question => question.level === level)
  } else if (level === 'any') {
    console.log('entered 3')
    return q.filter(question => question.tags.includes(tag))
  } else {
    console.log('questions before filter:', q)
    console.log('entered 4', level, q[0].level, typeof(level), typeof(q[0].level))
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

    return (
      <div className="uk-container">
        <div className="uk-card uk-card-default uk-card-body uk-width-1-1 uk-padding">
          {content}
        </div>
      </div>
    )
  }
}
