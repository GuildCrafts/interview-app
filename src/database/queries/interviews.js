import knex from '../db.js'
import utilities from './utilities'
import users from './users'

const create = (attributes, github_handle) => {
  return users.findbyGithub(github_handle)
    .then( theUser => {
      attributes.user_id = theUser[0].id
      attributes.feedback = JSON.stringify(attributes.feedback)
      return utilities.create('interviews', attributes)
    })
}

const findbyHandle = (github_handle) => {
  return users.findbyGithub(github_handle)
    .then(user => {
      return utilities.findAllWhere('interviews', 'user_id', user[0].id)
    })
    .then(interviews => interviews)
}

const findbyID = (userID) => {
  return utilities.findAllWhere('interviews', 'user_id', userID)
    .then(interviews => interviews)
}

export {
  create,
  findbyID,
  findbyHandle
 }
