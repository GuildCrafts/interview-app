import knex from '../db.js'
import utilities from './utilities'

const all = () => {
  return knex
    .select('topics.name as name')
    .from('topics')
    .orderBy('name')
    .then( topics => topics.map(topic => topic.name))
}

const withQuestions = () => {
  let approvedQuestionIds = knex('questions').where('approval', true).select('id')

  return knex('topics')
  .distinct('name')
  .select()
  .innerJoin('questionTopics', 'topics.id', 'questionTopics.topic_id')
  .where('question_id', 'in', approvedQuestionIds)
  .orderBy('name')
  .then( topics => topics.map(topic => topic.name));
}

export { all, withQuestions }
