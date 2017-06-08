import chai, { expect } from 'chai'
import * as topic from '../../../src/server/routes/topics'
import app from '../../../app.js'
import chaiHttp from 'chai-http'
import knex from '../../../src/database/db.js'

let should = chai.should()
chai.use(chaiHttp)

describe('api/topics', () => {

  beforeEach(() => {
    return knex.raw('truncate table ' + 'questions' + ' cascade')
  })

  it('Should respond with a status code of 200 and get all the topics', (done) => {
    chai.request(app)
    .get('/api/topics/')
      .then((res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.eql(['core-javascript', 'functional-programming'])
        done();
      })
  })

  it('Should get all topics with an approved question associated', (done) => {
    chai.request(app)
    .post('/api/questions/')
    .send({
      question: 'Who is Murphy?',
      answer: 'your mom',
      topics: 'core-javascript',
      level: 'beginner',
      points: 1,
    })
    //read the question
    .then((newQuestionRes) => {
      newQuestionRes.should.have.status(200);
      let newQuestionId = newQuestionRes.body
      return chai.request(app)
      .get('/api/questions/' + newQuestionId )
    })
    //update the question
    .then(newQuestion => {
      return chai.request(app)
      .put('/api/questions/approval/' + newQuestion.body.id)
      .send({ id: newQuestion.body.id,
        question: 'Who is Murphy?',
        answer: 'your mom',
        level: 'beginner',
        hints: [],
        game_mode: null,
        points: 1,
        topics: [ 'core-javascript' ],
        is_approved: true
      })
    })
    .then((editedQuestion) => {
      return chai.request(app)
      .get('/api/topics/with-questions')
      .then((res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.eql(['core-javascript'])
        done()
      })
    })
  })

})
