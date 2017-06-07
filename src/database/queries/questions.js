import knex from '../db.js'
// import utilities from './utilities'

const create = ( question ) => {
  return knex.transaction(function (trx){
    return knex('questions')
    .transacting(trx)
    .insert({ question    : question.question,
              is_approved : false,
              level       : question.level,
              answer      : question.answer,
              // game_mode   : question.game_mode,
              points      : question.points}, 'id')
    .then( newQuestionID => {
      return knex('hints')
      .transacting(trx)
      .insert( (question.hints || []).map( hint => {
        return { 'text': hint, 'question_id': newQuestionID[0]}
      }))
      .then(() => {
        return knex.select('id')
        .from('topics')
        .whereIn('name',question.topics)
        .then( topicIDs => {
          if(topicIDs.length === 0 ){
            return Promise.reject(new Error('topic not found'))
          }
          return knex('questionTopics')
          .transacting(trx)
          .insert( topicIDs.map( topicID => {
            return { 'topic_id': topicID.id,'question_id':newQuestionID[0]}
          }))
        })
        .then( () => {
          return newQuestionID
        })
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .then(newQuestionID => {
    return newQuestionID[0]
    //returns only the new questions ID
  })
}

const updatebyID = ( question ) => {
  return knex.transaction(function(trx) {
      return knex.select('id')
      .from('questionTopics')
      .where('question_id', question.id)
      .then(topicsOfQuestion => {
        return knex('questionTopics')
        .transacting(trx)
        .delete('questionTopics')
        .whereIn('id', topicsOfQuestion.map(topicsOfQuestion => topicsOfQuestion.id))
      })
      .then(() => {
        return knex.select('id')
        .from('hints')
        .whereIn('question_id', question.id)
        .then(hints => {
          return knex('hints')
          .transacting(trx)
          .delete('hints')
          .whereIn('id', hints.map(hint => hint.id))
        })
      })
      .then(() => {
        return knex('questions')
        .where("id", question.id)
        .transacting(trx)
        .update({
            question : question.question,
            level    : question.level,
            answer   : question.answer,
            // game_mode: question.game_mode,
            points   : question.points,
            is_approved : question.is_approved},
        'id')
      })
      .then(() => {
        return knex.select('id')
        .from('topics')
        .whereIn('name', question.topics)
        .then( topics => {
          return knex('questionTopics')
          .transacting(trx)
          .insert( topics.map( topic => {
            return { question_id: question.id, topic_id: topic.id}
          }))
        })
      })
      .then(() => {
        return knex('hints')
        .transacting(trx)
        .insert( (question.hints || []).map( hint => {
          return { 'text': hint, 'question_id': question.id}
        }))
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
  .then(function(resp) {
    return question
  })
  .catch(err => {err})
}

const findbyID = ( data ) => {
  return knex
  .select('questions.id','question','answer','level','hints.text as hints','game_mode','points','topics.name as topics')
  .from('questions')
  .where( 'questions.id', data)
  .innerJoin('questionTopics','questions.id','questionTopics.question_id')
  .innerJoin('topics','questionTopics.topic_id','topics.id')
  .leftJoin('hints','questions.id','hints.question_id')
   .then( results => {
    return hintTopicMiddleWare(results)[0]
  })
}

const findAllQuestions = () => {
  return knex
  .select('questions.id','question','answer','level','hints.text as hints','game_mode','points','topics.name as topics','is_approved')
  .from('questions')
  .leftJoin('questionTopics','questions.id','questionTopics.question_id')
  .leftJoin('topics','questionTopics.topic_id','topics.id')
  .leftJoin('hints','questions.id','hints.question_id')
  .then( results => {
    return hintTopicMiddleWare(results)
  })
}

const findByApproval = ( data ) => {
  return knex
    .select('questions.id','question','answer','level','hints.text as hints','game_mode','points','topics.name as topics','is_approved')
    .from('questions')
    .where('is_approved', data)
    .leftJoin('questionTopics','questions.id','questionTopics.question_id')
    .leftJoin('topics','questionTopics.topic_id','topics.id')
    .leftJoin('hints','questions.id','hints.question_id')
    .then( results => {
      return hintTopicMiddleWare(results)
    })
}

const findbyTopic = ( topics ) => {
  return knex
  .select('questions.id','question','answer','level','hints.text as hints','game_mode','points','is_approved','topics.name as topics')
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
  .select('questions.id','question','answer','level','hints.text as hints','game_mode','points','topics.name as topics','is_approved')
  .from('questions')
  .whereIn( 'level', data)
  .innerJoin('questionTopics','questions.id','questionTopics.question_id')
  .innerJoin('topics','questionTopics.topic_id','topics.id')
  .innerJoin('hints','questions.id','hints.question_id').then( results => {
    return hintTopicMiddleWare(results)
  })
}

const deletebyID = ( data ) => {
  return knex('questions')
  .where('id',data)
  .del()
}

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
      if(question.hints === null) {
        question.hints = []
      } else {
        question.hints = [question.hints]
      }
    }
    return obj
  },{})
  return Object.values(newObj)
}

export {
  create,
  findbyTopic,
  findbyID,
  findbyLevel,
  findAllQuestions,
  updatebyID,
  findByApproval,
  deletebyID
}
