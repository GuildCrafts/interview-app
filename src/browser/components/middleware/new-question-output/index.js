import React from 'react';

export default function NewQuestionOutput( input ){
  let question
  let answer
  let level
  let game_mode
  let points
  let topics = []
  let hints = []

  Object.keys( input ).forEach( field => {
    if( field == 'Question'){
      question = input[field]
    }else if( field == 'Answer'){
      answer = input[field]
    }else if( field == 'Difficulty Level'){
      level = input[field]
    }else if( field == 'Game Mode'){
      game_mode = input[field]
    }else if( field.substring(0,5) == 'Topic' && input[field] == true ){
      topics.push(field)
    }else if( field.substring(0,4) == 'Hint' ){
      hints.push(input[field])
    }else if( field == 'Points' ){
      points = input[field]
    }
  })

  return {
    'question' : question,
    'answer'   : answer,
    'level'    : level,
    'topics'   : topics,
    'hints'    : hints,
    'game_mode': game_mode,
    'points'   : points
  }
}
