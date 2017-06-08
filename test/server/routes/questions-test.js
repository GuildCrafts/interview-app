import chai, { expect } from 'chai'
import * as question from '../../../src/server/routes/questions'
import * as queries from '../../../src/database/queries/questions'
import app from '../../../app.js'
import chaiHttp from 'chai-http'
import knex from '../../../src/database/db.js'

let should = chai.should()
chai.use(chaiHttp)

describe('api/questions', () => {

  beforeEach(() => {
    return knex.raw('truncate table ' + 'questions' + '  cascade')
  })

  const sampleQuestions = [
    {
      question: "What is the number that represents the meaning of life",
      topics: ["core-javascript", "functional-programming"],
      level: "beginner",
      answer: "42",
      hints: ["Hitchhiking", "Galaxy"],
      points: 1
    },
    {
      question: "What is the most inefficient algorithm",
      topics: ["functional-programming"],
      level: "intermediate",
      answer: "THE ALGORITHM",
      game_mode: "Questions and Answers",
      hints: ["BubbleSort", "LearnersGuild", "#LGPROBLEMS"],
      points: 3
    },
    {
      question: "What is the worst question",
      topics: ["core-javascript"],
      level: "jedi",
      answer: "This one",
      game_mode: "Questions and Answers",
      hints: ["Sort"],
      points: 5
    }
  ]

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
          id: newQuestionId,
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
    })
    .then((editedQuestion) => {
      return chai.request(app)
      .get('/api/questions/' + editedQuestion.body.id )
      .then((response) => {
        response.body.should.eql({ id: editedQuestion.body.id,
          question: 'Who is Murphy?',
          answer: 'your mom',
          level: 'jedi',
          hints: [],
          game_mode: null,
          points: 1,
          topics: [ 'core-javascript' ]
        })
        return response
      })
    })

    // delete the question
    .then(updatedQuestion => {
      return chai.request(app)
      .delete('/api/questions/approval/' + updatedQuestion.body.id)
    })
    .then(deletedQuestionRes => {
      deletedQuestionRes.body.should.eql({ 'message': 'deleted', 'id': deletedQuestionRes.body.id })
      return chai.request(app)
      .get('/api/questions/' + deletedQuestionRes.body.id)
    })
    .then (findDeletedQuestionRes => {
      findDeletedQuestionRes.body.should.eql('')
      done()
    })
    .catch(err => {
      console.log( 'err:', err )
      done(err)
    })
  })

  it('Should show questions that are approved', () => {
    return queries.create( sampleQuestions[0] )
    .then(createdQuestionID => {
      return {
        id: createdQuestionID,
        question: "What is the number that represents the meaning of life",
        topics: ["core-javascript", "functional-programming"],
        level: "beginner",
        answer: "42",
        hints: ["Hitchhiking", "Galaxy"],
        points: 1,
        is_approved: true
      }
    })
    .then(result => {
      return queries.updatebyID(result)
      .then(response => {
        return chai.request(app)
        .get('/api/questions/approved')
        .then((res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.eql(1)
          res.body[0].is_approved.should.eql(true)
        })
      })
    })
  })

  it('Should show questions awaiting approval', () => {
    return queries.create( sampleQuestions[0] )
    .then(createdQuestionID => {
      return chai.request(app)
      .get('/api/questions/approval')
      .then((res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.eql(1)
        res.body[0].is_approved.should.eql(false)
      })
    })
  })

})
