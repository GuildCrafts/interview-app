import knex from '../db.js'
import utilities from './utilities'

const create = attributes =>
  utilities.create('questions', attributes)
  .then(question => question)

const findbyTag = ( data ) =>
  utilities.findAllWhere('questions', 'tags', data)
  .then(question => question)

const findbyTopic = ( data ) =>
  utilities.findAllWhere('questions', 'topic', data)
  .then(question => question)

const findbyDifficulty = ( data ) =>
  utilities.findAllWhere('questions', 'difficulty', data)
  .then(question => question)

const updatebyTag = ( data, attributes ) =>
  utilities.update( 'questions', 'tags', data, attributes)
  .then(question => question)

const updatebyTopic = ( data, attributes ) =>
  utilities.update( 'questions', 'topic', data, attributes)
  .then(question => question)

  const updatebyDifficulty = ( data, attributes ) =>
    utilities.update( 'questions', 'difficulty', data, attributes)
    .then(question => question)

    const deleteByQuestion = ( data, attributes ) =>
      utilities.delete( 'questions', 'question', data, attributes)
      .then(question => question)

    const deleteByTopic = ( data, attributes ) =>
      utilities.delete( 'questions', 'topic', data, attributes)
      .then(question => question)

      const deleteByDifficulty = ( data, attributes ) =>
        utilities.delete( 'questions', 'difficulty', data, attributes)
        .then(question => question)



export {
  create,
  findbyTag,
  findbyTopic,
  findbyDifficulty,
  updatebyTag,
  updatebyTopic,
  updatebyDifficulty,
  deleteByQuestion,
  deleteByTopic,
  deleteByDifficulty
}
