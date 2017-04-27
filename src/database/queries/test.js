// // import findbyTopic from './questions'
// import knex from '../db.js'
//
// const getAllQuestions = ( topics ) => {
//   return knex
//   .from('questions')
//   .innerJoin('questionTopics','questions.id','questionTopics.question_id')
//   .innerJoin('topics','questionTopics.topic_id','topics.id')
//   .innerJoin('hints','questions.id','hints.question_id')
//   .returning('*')
// }
//
// const findbyID = ( data ) => {
//   return knex
//   .select('questions.id','question','answer','level','hints.text as hints','game_mode','points','topics.name as topics')
//   .from('questions')
//   .whereIn( 'questions.id', data)
//   .innerJoin('questionTopics','questions.id','questionTopics.question_id')
//   .innerJoin('topics','questionTopics.topic_id','topics.id')
//   .innerJoin('hints','questions.id','hints.question_id')
// }
//
// const create = ( question ) => {
//   return knex.transaction(function (trx){
//     return knex('questions')
//     .transacting(trx)
//     .insert({question:question.question,
//               approval:false,
//               level:question.level,
//               answer:question.answer,
//               points:question.points}, 'id')
//     .then( function(questionID){
//       return knex('hints')
//       .transacting(trx)
//       .insert( question.hints.map( hint => {
//         return { 'text':hint, 'question_id':questionID[0]}
//       }), 'question_id')
//     })
//     .then( function(questionID){
//       return knex.select('id')
//       .from('topics')
//       .whereIn('name',question.topics)
//       .then( topicIDs => {
//         return knex('questionTopics')
//         .transacting(trx)
//         .insert( topicIDs.map( topicID => {
//           return { 'topic_id': topicID.id,'question_id':questionID[0]}
//         }))
//       })
//     })
//     .then(trx.commit)
//     .catch(trx.rollback)
//   })
// }
//
//
// function hintTopicMiddleWare(array){
//
//  var newObj = array.reduce(function(obj,question){
//
//     if(obj[question.id]){
//       if(!obj[question.id].topics.includes(question.topics)){
//         obj[question.id].topics.push(question.topics)
//       }
//       if(!obj[question.id].hints.includes(question.hints)){
//         obj[question.id].hints.push(question.hints)
//       }
//     }else{
//       obj[question.id] = question
//       question.topics = [question.topics]
//       question.hints = [question.hints]
//     }
//     return obj
//   },{})
//   return newObj
// }
//
//
// let question = {
//    question: 'This was a triumph',
//    answer: 'magic',
//    level: 'intermediate',
//    hints: [ 'lexical', 'variable' ],
//    game_mode: null,
//    points: 4,
//    topics: [ 'core-javascript','functional-programming'] }
//
// create( question )
