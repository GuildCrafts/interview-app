import knex from '../db.js'
import utilities from './utilities'

const create = attributes => {
  attributes.tags = JSON.stringify(attributes.tags)
  attributes.prompts = JSON.stringify(attributes.prompts)
  return utilities.create('questions', attributes)
  .then(question => question)
}

const findbyID = ( data ) =>
  utilities.findAllWhere('questions', 'id', data)
  .then(questions => questions[0])

const findbyTag = ( tags ) => {
  let whereClauses = tags.map(tag => "tags @> '" + JSON.stringify([tag]) + "'")
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
  findbyTag,
  findbyID,
  findbyLevel,
  updatebyID,
  updatebyLevel,
  deleteByQuestion,
  deleteByID
}
