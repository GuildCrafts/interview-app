import knex from '../db.js'
import utilities from './utilities'

const all = () => {
  return knex
    .select('topics.name as name')
    .from('topics')
    .then( topics => topics.map(topic => topic.name))
}

const withQuestions = () => {
  console.log('query::', knex.select('distinct(topics.name) as name')
              .from('topics')
              .innerJoin('questionTopics', 'topics.id', 'questionTopics.topic_id')
              .orderBy('name').toString());
  return knex
  .select('distinct(topics.name) as name')
  .from('topics')
  .innerJoin('questionTopics', 'topics.id', 'questionTopics.topic_id')
  .orderBy('name')
  .then( topics => topics.map(topic => topic.name));
}

export { all, withQuestions }
