import chai, { expect } from 'chai'
import * as interviews from '../../../src/database/queries/interviews'
import * as user from '../../../src/database/queries/users'

describe.only('interviews feedback', () => {
  const newInterview = {
    user_id: 1,
    feedback: 'You can haz job nao.'
  }

  const newInterview1 = {
    user_id: 1,
    feedback: 'You can haz job NEVER.'
  }

  const newUser = {
    name: "Becky Fast",
    github_handle: "@ihop4pancakes",
    approver: true
  }

  it('Should be type object', () => {
    expect(interviews).to.be.a('object')
  })

  describe('create', () => {
    it('Should create data in the interviews table', () => {
      return user.create(newUser)
        .then( user => {
          return interviews.create(newInterview, user[0].github_handle)
        })
        .then(interview => {
          expect(interview[0].user_id).to.be.a('number')
        })
    })
  })

  describe('update', () => {
    it('Should update data in the interviews table', () => {
      return interviews.update(newUser)
        .then( user => {
          return interviews.update('interviews', user.id)
        })
        .then(interview => {
          expect(interview[0].user_id).to.be('number')
        })
    })
  })

  describe('find interviews by Handle', () => {
    it('Should return interviews when given the user ID', () => {
      return interviews.findbyHandle(newUser.github_handle)
        .then(results => {
          expect(results.length).to.eql(1)
        })
    })
  })

  describe('find interviews by ID', () => {
    it('Should return interviews when given the user ID', () => {
      return interviews.findbyID(1)
        .then(results => {
          expect(results.length).to.eql(1)
        })
    })
  })



})
