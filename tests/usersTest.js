import chai, { expect } from 'chai'
import * as user from '../src/database/queries/users'

describe('User Tests', () => {
  const newUser = [
    {
      name: "Dongle McDongleface",
      github: '@donglyboy69'
    },
    {
      name: "Armand Hammer",
      github: "@bakes4soda"
    },
    {
      name: "Becky Fast",
      github: "@ihop4pancakes"
    }
  ]

  it('Should be type object', () => {
    expect(user).to.be.a('object')
  })

describe('create', () => {

  it('Should create data in the users table', () => {
    return user.create(newUser[0]).then( user =>
      expect(user[0].name).to.equal('Dongle McDongleface')
    )
  })
})

describe('FindbyGithub', () => {

  it('Should look up data based on github handle', () => {
    return user.create(newUser[1])
    .then ( () => {
      return user.findbyGithub('@bakes4soda')
      .then( user => {
          expect(user[0].name).to.equal('Armand Hammer')
        })
      })
    })
  })

  describe('FindbyName', () => {

    it('Should look up data based on name', () => {
      return user.create(newUser[2])
      .then ( () => {
        return user.findbyName('Becky Fast')
        .then( user => {
            expect(user[0].github).to.equal('@ihop4pancakes')
          })
        })
      })
    })

  describe('UpdatebyGithub', () => {

      it('Should update the table by github handle after a new user is created', () => {
        return user.create(newUser[0])
        .then ( () => {
          return user.updatebyGithub('@donglyboy69', {name: 'D. Ongle'})
          .then( user => {
              expect(user[0].name).to.equal('D. Ongle')
            })
          })
        })
      })

  describe('UpdatebyName', () => {

    it('Should update the table by name after a new user is created', () => {
      return user.create(newUser[0])
      .then ( () => {
        return user.updatebyName('Dongle McDongleface', {github: '@dingledongle12'})
        .then( user => {
            expect(user[0].github).to.equal('@dingledongle12')
          })
        })
      })
    })

    describe('DeletebyGithub', () => {

        it('Should delete the table by github handle after a new user is created', () => {
          return user.create(newUser[2])
          .then ( () => {
            return user.deletebyGithub('@ihop4pancakes')
            .then( user => {
                expect(user[0]).to.equal( undefined )
              })
            })
          })
        })

    describe('DeletebyName', () => {

      it('Should delete the table by name after a new user is created', () => {
        return user.create(newUser[1])
        .then ( () => {
          return user.deletebyName('Armand Hammer')
          .then( user => {
              expect(user[0]).to.equal( undefined )
            })
          })
        })
      })
})
