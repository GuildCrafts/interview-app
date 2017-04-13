import chai, { expect } from 'chai'
import * as question from '../../../src/server/routes/questions'
import app from '../../../app.js'
import chaiHttp from 'chai-http'

let should = chai.should()
chai.use(chaiHttp)

describe('api/questions', () => {
  it('Should respond with a status code of 200 and get all the questions', (done) => {
    chai.request('http://interview.learnersguild.dev/api')
    .get('/questions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      })
  })
  it('Should respond with a status code of 200 and get by id', (done) => {
    chai.request('http://interview.learnersguild.dev/api/questions/1')
    .get('/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
  })
  it('Should respond with a status code of 200 and get by level', (done) => {
    chai.request('http://interview.learnersguild.dev/api/questions/1')
    .get('/:level')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
  })
})
