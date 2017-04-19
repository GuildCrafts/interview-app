import knex from '../db.js'
import utilities from './utilities'

const create = attributes => {
  attributes.topics = JSON.stringify(attributes.topics)
  attributes.hints = JSON.stringify(attributes.hints)
  return utilities.create('questions', attributes)
  .then(question => question)
}

const findbyID = ( data ) =>
  utilities.findAllWhere('questions', 'id', data)
  .then(questions => questions[0])

const findbyTopic = ( topics ) => {
  let whereClauses = topics.map(topic => "topics @> '" + JSON.stringify([topic]) + "'")
  whereClauses = whereClauses.join(' OR ')
  return utilities.findAllWhereRaw('questions', whereClauses)
  .then(question => question)
}

const findbyLevel = ( data ) =>
  utilities.findAllWhere('questions', 'level', data)
  .then(question => question)

const updatebyID = ( id, attributes ) =>
  utilities.update( 'questions', 'id', id, attributes)
  .then(question => question)


const updatebyLevel = ( data, attributes ) =>
  utilities.update( 'questions', 'level', data, attributes)
  .then(question => question)

const deleteByQuestion = ( data, attributes ) =>
  utilities.delete( 'questions', 'question', data, attributes)
  .then(question => question)


const deleteByID = ( data, attributes ) =>
  utilities.delete( 'questions', 'id', data, attributes)
  .then(question => question)



export {
  create,
  findbyTopic,
  findbyID,
  findbyLevel,
  updatebyID,
  updatebyLevel,
  deleteByQuestion,
  deleteByID
}
