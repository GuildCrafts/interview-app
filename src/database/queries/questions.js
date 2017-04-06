import knex from '../db.js'
import utilities from './utilities'

const create = attributes => {
  attributes.tags = JSON.stringify(attributes.tags)
  return utilities.create('questions', attributes)
  .then(question => question)
}


const findbyTag = ( tags ) => {
  let whereClauses = tags.map(tag => "tags @> '" + JSON.stringify([tag]) + "'")
  whereClauses = whereClauses.join(' OR ')
  return utilities.findAllWhereRaw('questions', whereClauses)
  .then(question => question)
}

// const findbyTopic = ( data ) =>
//   utilities.findAllWhere('questions', 'topic', data)
//   .then(question => question)

const findbyLevel = ( data ) =>
  utilities.findAllWhere('questions', 'level', data)
  .then(question => question)

const updatebyTag = ( data, attributes ) =>
  utilities.update( 'questions', 'tags', data, attributes)
  .then(question => question)

const updatebyTopic = ( data, attributes ) =>
  utilities.update( 'questions', 'topic', data, attributes)
  .then(question => question)

  const updatebyLevel = ( data, attributes ) =>
    utilities.update( 'questions', 'level', data, attributes)
    .then(question => question)

    const deleteByQuestion = ( data, attributes ) =>
      utilities.delete( 'questions', 'question', data, attributes)
      .then(question => question)

    const deleteByTopic = ( data, attributes ) =>
      utilities.delete( 'questions', 'topic', data, attributes)
      .then(question => question)

      const deleteByLevel = ( data, attributes ) =>
        utilities.delete( 'questions', 'level', data, attributes)
        .then(question => question)



export {
  create,
  findbyTag,
  findbyLevel,
  updatebyTag,
  updatebyLevel,
  deleteByQuestion,
  deleteByTopic,
  deleteByLevel
}
