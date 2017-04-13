import chai, { expect } from 'chai'
import * as user from '../../../src/server/routes/users'
import app from '../../../app.js'
import chaiHttp from 'chai-http'
import fs from 'fs'

let should = chai.should()
chai.use(chaiHttp)

describe('api/users', () => {
  it('Should create user, then respond with length, then edit user to add something, then respond with body of user, then delete user', (done) => {
    chai.request(app)
    //create the user
    .post('/api/users/')
    .send({
      'user': 'Murphy?',
      'github_handle': 'Smurphy'
    })
    //read the user
    .then((newUserRes) => {
      newUserRes.should.have.status(200);
      newUserRes.body.length.should.eql(1);
      return newUserRes.body[0]
    })
    //update the user by github_handle
    .then(newUser => {
      return chai.request(app)
      .put('/api/users/' + newUser.github_handle)
      .send({'approver': true})
    })
    //read the user
    .then(updatedResponseRes => {
      updatedResponseRes.should.have.status(200);
      updatedResponseRes.body.should.eql({
        'user': 'Murphy?',
        'github_handle': 'Smurphy',
        'approver': true
      })
      return updatedResponseRes.body
    })
    done()
    .catch( err => console.log('err', err))
  })
})
