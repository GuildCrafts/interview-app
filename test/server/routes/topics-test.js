import chai, { expect } from 'chai'
import * as topic from '../../../src/server/routes/topics'
import app from '../../../app.js'
import chaiHttp from 'chai-http'

let should = chai.should()
chai.use(chaiHttp)

describe.only('api/topics', () => {
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
    .get('/api/topics/with-questions')
      .then((res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.eql(['functional-programming'])
      })
      done();
  })

})
