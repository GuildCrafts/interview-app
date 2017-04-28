import knex from '../db.js'
import utilities from './utilities'
import users from './users'

const create = (attributes, github_handle) => {
  return users.findbyGithub(github_handle)
    .then( theUser => {
      if(theUser) {
        attributes.user_id = theUser.id
        attributes.feedback = JSON.stringify(attributes.feedback)
        return utilities.create('interviews', attributes)
      }
      return Promise.reject(new Error(`User with handle '${github_handle}' does not exist. `))
    })
}

const update = (attributes, id) => {
  //TODO: need to check if the interview is owned by the logged in user
  return utilities.update('interviews', 'id', id, attributes)
}

const findbyHandle = (github_handle) => {
  return users.findbyGithub(github_handle)
    .then(user => {
      return utilities.findAllWhere('interviews', 'user_id', user.id)
    })
    .then(interviews => interviews)
}

const findbyUserID = (userID) => {
  return utilities.findAllWhere('interviews', 'user_id', userID)
    .then(interviews => interviews)
}

export {
  create,
  update,
  findbyUserID,
  findbyHandle
 }
