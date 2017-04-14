import knex from '../db.js'
import utilities from './utilities'

const create = attributes =>
  utilities.create('users', attributes)
  .then(user => user)

const findbyGithub = ( data ) =>
  utilities.findAllWhere('users', 'github_handle', data)
  .then(users => users[0])

const findbyName = ( data ) =>
  utilities.findAllWhere('users', 'name', data)
  .then(user => user)

const updatebyGithub = ( data, attributes ) =>
  utilities.update('users', 'github_handle', data.github_handle, attributes)
  .then(users => users)

const updatebyName = ( data, attributes ) =>
  utilities.update('users', 'name', data, attributes)
  .then(user => user)

const updatebyID = ( data, attributes ) =>
  utilities.update('users', 'id', data, attributes)
  .then(user => user)

const deletebyGithub = ( data ) =>
  utilities.delete('users', 'github_handle', data)
  .then(user => user)

const deletebyName = ( data ) =>
  utilities.delete('users', 'name', data)
  .then(user => user)

const deletebyID = ( data ) =>
  utilities.delete('users', 'id', data)
  .then(user => user)


export {
  create,
  findbyGithub,
  findbyName,
  updatebyGithub,
  updatebyName,
  updatebyID,
  deletebyGithub,
  deletebyName,
  deletebyID
}
