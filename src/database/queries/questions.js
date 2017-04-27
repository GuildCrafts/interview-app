import knex from '../db.js'
import utilities from './utilities'

const create = ( question ) => {
  return knex.transaction(function (trx){
    return knex('questions')
    .transacting(trx)
    .insert({question:question.question,
              approval:false,
              level:question.level,
              answer:question.answer,
              points:question.points}, 'id')
    .then( function(questionID){
      return knex('hints')
      .transacting(trx)
      .insert( question.hints.map( hint => {
        return { 'text':hint, 'question_id':questionID[0]}
      }), 'question_id')
    })
    .then( function(questionID){
      return knex.select('id')
      .from('topics')
      .whereIn('name',question.topics)
      .then( topicIDs => {
        return knex('questionTopics')
        .transacting(trx)
        .insert( topicIDs.map( topicID => {
          return { 'topic_id': topicID.id,'question_id':questionID[0]}
        }))
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
}

const findbyID = ( data ) => {
  return knex
  .select('questions.id','question','answer','level','hints.text as hints','game_mode','points','topics.name as topics')
  .from('questions')
  .whereIn( 'questions.id', data)
  .innerJoin('questionTopics','questions.id','questionTopics.question_id')
  .innerJoin('topics','questionTopics.topic_id','topics.id')
  .innerJoin('hints','questions.id','hints.question_id').then( results => {
    return hintTopicMiddleWare(results)
  })
}


const findbyTopic = ( topics ) => {
  return knex
  .select('questions.id','question','answer','level','hints.text as hints','game_mode','points')
  .from('topics')
  .whereIn( 'name', topics )
  .innerJoin('questionTopics','topics.id','questionTopics.topic_id')
  .innerJoin('questions','questionTopics.question_id','questions.id')
  .innerJoin('hints','questions.id','hints.question_id').then( results => {
    return hintTopicMiddleWare(results)
  })
}


const findbyLevel = ( data ) => {
  return knex
  .select('questions.id','question','answer','level','hints.text as hints','game_mode','points','topics.name as topics')
  .from('questions')
  .whereIn( 'level', data)
  .innerJoin('questionTopics','questions.id','questionTopics.question_id')
  .innerJoin('topics','questionTopics.topic_id','topics.id')
  .innerJoin('hints','questions.id','hints.question_id').then( results => {
    return hintTopicMiddleWare(results)
  })
}

const updatebyID = ( id, attributes ) =>
  utilities.update( 'questions', 'id', id, attributes)

//do we need this?
const updatebyLevel = ( data, attributes ) =>
  utilities.update( 'questions', 'level', data, attributes)

const deleteByQuestion = ( data, attributes ) =>
  utilities.delete( 'questions', 'question', data, attributes)


const deleteByID = ( data, attributes ) =>
  utilities.delete( 'questions', 'id', data, attributes)

function hintTopicMiddleWare(array){

 var newObj = array.reduce(function(obj,question){

    if(obj[question.id]){
      if(!obj[question.id].topics.includes(question.topics)){
        obj[question.id].topics.push(question.topics)
      }
      if(!obj[question.id].hints.includes(question.hints)){
        obj[question.id].hints.push(question.hints)
      }
    }else{
      obj[question.id] = question
      question.topics = [question.topics]
      question.hints = [question.hints]
    }
    return obj
  },{})
  return newObj
}

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
