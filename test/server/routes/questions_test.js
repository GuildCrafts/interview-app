import chai, { expect } from 'chai'
import * as question from '../../../src/server/routes/questions'
import app from '../../../app.js'
import chaiHttp from 'chai-http'

let should = chai.should()
chai.use(chaiHttp)

describe('api/questions', () => {
  it('Should respond with a status code of 200 and get all the questions', (done) => {
    chai.request(app)
    .get('/api/questions')
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      })
  })
  it('Should create question, then respond with length, then edit question to add level, \
  then respond with body of question, then delete question', (done) => {
    chai.request(app)
    //create the question
    .post('/api/questions/')
    .send({
      'question': 'Who is Murphy?',
      'answer': 'your mom'
    })
    //read the question
    .then((newQuestionRes) => {
      newQuestionRes.should.have.status(200);
      newQuestionRes.body.length.should.eql(1);
      return newQuestionRes.body[0]
    })
    //update the question
    .then(newQuestion => {
      return chai.request(app)
      .put('/api/questions/' + newQuestion.id)
      .send({'level': 'beginner'})
    })
    //read the question
    .then(updatedQuestionRes => {
      updatedQuestionRes.should.have.status(200);
      updatedQuestionRes.body.should.eql({
        id: updatedQuestionRes.body.id,
        topics: null,
        question: 'Who is Murphy?',
        level: 'beginner',
        answer: 'your mom',
        points: null,
        hints: null
      })
      return updatedQuestionRes.body
    })
    //delete the question
    .then(updatedQuestion => {
      return chai.request(app)
      .delete('/api/questions/' + updatedQuestion.id)
      //read the question
      .then(deletedQuestionRes => {
        deletedQuestionRes.body.should.eql({ 'message': 'deleted' })
        return chai.request(app)
        .get('/api/questions/' + updatedQuestion.id)
      })
      .then (findDeletedQuestionRes => {
        findDeletedQuestionRes.body.should.eql('')
        done()
      })
    })
    .catch( err => console.log('err', err))
  })
})
