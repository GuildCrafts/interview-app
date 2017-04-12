import chai, { expect } from 'chai'
import * as question from '../../../src/server/routes/questions'
import app from '../../../app.js'
import chaiHttp from 'chai-http'
import fs from 'fs'

let should = chai.should()
chai.use(chaiHttp)

describe('api/users', () => {
  it('Should respond with a status code of 200 and get all the users', (done) => {
    chai.request('http://interview.learnersguild.dev')
    .post('/api/users')
    .field("Murph Murph", "@MurphyCat")
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
  it('should respond with a status code of 200 and get by id', (done) => {
    chai.request('http://interview.learnersguild.dev/api')
    .get('/:id')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
  it('should resppond with a status code of 200 and get by id', (done) => {
    chai.request('http://interview.learnersguild.dev/api')
    .get('/github_handle/:github_handle')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
})
