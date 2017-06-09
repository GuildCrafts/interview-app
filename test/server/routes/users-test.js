import chai, { expect } from 'chai'
import * as user from '../../../src/server/routes/users'
import app from '../../../app.js'
import chaiHttp from 'chai-http'
import fs from 'fs'

let should = chai.should()
chai.use(chaiHttp)


describe('api/users', () => {
  
  it('Should return JSON when visiting the route /current_user', (done) => {
    chai.request(app)
      .get('/api/users/current_user')
      .end((err, requestedUser) => {
        requestedUser.should.have.status(200)
        expect(requestedUser.body.github_handle).to.eql('fake-user')
        //fake-user comes from auth.js
        done()
      })
  })

  it('Should create user, then respond with length, then edit user to add something, then respond with body of user', (done) => {
    chai.request(app)
    .post('/api/users/')
    .send({
      'name': 'CAT',
      'github_handle': 'KitKat'
    })
    .then( res => {
      return chai.request(app)
      .post('/api/users/')
      .send({
        'name': 'Murphy?',
        'github_handle': 'Smurphy'
      })
    })
    .then((newUserRes) => {
      expect(newUserRes).to.have.status(200);
      expect(newUserRes.body).to.eql({ name: 'Murphy?', github_handle: 'Smurphy' });
      return newUserRes.body
    })
    .then(newUser => {
      return chai.request(app)
      .put('/api/users/github_handle/' + newUser.github_handle)
      .send({'approver': true})
    })
    .then(updatedResponseRes => {
      expect(updatedResponseRes).to.have.status(200);
      expect(updatedResponseRes.body).to.eql(
        {
          'id': 2,
          'name': 'Murphy?',
          'github_handle': 'Smurphy',
          'approver': true
        }
      )
      done()
    })
    .catch( err => console.log('err TEST', err))
  })
})
