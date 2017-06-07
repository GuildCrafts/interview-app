import chai, { expect } from 'chai'
import * as question from '../../../src/server/routes/questions'
import * as queries from '../../../src/database/queries/questions'
import app from '../../../app.js'
import chaiHttp from 'chai-http'

let should = chai.should()
chai.use(chaiHttp)

describe.only('api/questions', () => {
  it('Should respond with a status code of 200 and get all the questions', (done) => {
    chai.request(app)
    .get('/api/questions/')
      .then((res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        done();
      })
  })

  it('Should create question, then respond with length, then edit question to add level, then respond with body of question, then delete question', (done) => {
    chai.request(app)
    //create the question
    .post('/api/questions/')
    .send({
      question: 'Who is Murphy?',
      answer: 'your mom',
      topics: 'core-javascript',
      level: 'beginner',
      points: 1
    })
    //read the question
    .then((newQuestionRes) => {
      newQuestionRes.should.have.status(200);
      let newQuestionId = newQuestionRes.body
      return chai.request(app)
      .get('/api/questions/' + newQuestionId )
      .then((response) => {
        response.body.should.eql({
          id: 1,
          question: 'Who is Murphy?',
          answer: 'your mom',
          level: 'beginner',
          hints: [],
          game_mode: null,
          points: 1,
          topics: [ 'core-javascript' ]
        })
        return response
      })
    })
    //update the question
    .then(newQuestion => {
      console.log( 'newQuestion:', newQuestion.body )
      return chai.request(app)
      .put('/api/questions/approval/' + newQuestion.body.id)
      .send({ id: newQuestion.body.id,
        question: 'Who is Murphy?',
        answer: 'your mom',
        level: 'jedi',
        hints: [],
        game_mode: null,
        points: 1,
        topics: [ 'core-javascript' ]
      })
      return result
    //   .then((editedQuestion) => {
    //     // .get('/api/questions/' + newQuestion.body.id )
    //     console.log( 'newQuestionID:::', newQuestionID )
    //
    //     // response.body.should.eql({ id: newQuestion.body.id,
    //     //   question: 'Who is Murphy?',
    //     //   answer: 'your mom',
    //     //   level: 'jedi',
    //     //   hints: [],
    //     //   game_mode: null,
    //     //   points: 1,
    //     //   topics: [ 'core-javascript' ]
    //     // })
    //   done()
    // })
    // read the question
    // .then((updatedQuestionRes) => {
    //   console.log( 'updatedQuestionRes:', updatedQuestionRes.body )
    //   let updatedQuestionId = updatedQuestionRes.body.id
    //   return chai.request(app)
    //   .get('/api/questions/' + updatedQuestionId )
    //   .then((response) => {
    //     response.body.should.eql({ id: updatedQuestionId,
    //       question: 'Who is Murphy?',
    //       answer: 'your mom',
    //       level: 'jedi',
    //       hints: [],
    //       game_mode: null,
    //       points: 1,
    //       topics: [ 'core-javascript' ]
    //     })
    //   done()
    //   })
    })
    .catch(err => {
      console.log( 'err:', err )
      done(err)
    })
    // .get('/api/questions/' + newQuestion.body.id )
    .then((result) => {console.log("results>>>", result.body)})
    // //delete the question
    // .then(updatedQuestion => {
    //   return chai.request(app)
    //   .delete('/api/questions/' + updatedQuestion.id)
    //   //read the question
    //   .then(deletedQuestionRes => {
    //     deletedQuestionRes.body.should.eql({ 'message': 'deleted' })
    //     return chai.request(app)
    //     .get('/api/questions/' + updatedQuestion.id)
    //   })
    //   .then (findDeletedQuestionRes => {
    //     findDeletedQuestionRes.body.should.eql('')
    //     done()
    //   })
    // })
    // .catch( err => console.log('err', err))
  })
})
