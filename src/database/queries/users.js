import knex from '../db.js'
import utilities from './utilities'
// console.log(utilities);

const create = attributes =>
  utilities.create('users', attributes)
  .then(user => user)

const findbyGithub = ( data ) =>
  utilities.findAllWhere('users', 'github', data)
  .then(user => user)

const findbyName = ( data ) =>
  utilities.findAllWhere('users', 'name', data)
  .then(user => user)

const updatebyGithub = ( data, attributes ) =>
  utilities.update('users', 'github', data, attributes)
  .then(user => user)

const updatebyName = ( data, attributes ) =>
  utilities.update('users', 'name', data, attributes)
  .then(user => user)

const deletebyGithub = ( data ) =>
  utilities.delete('users', 'github', data)
  .then(user => user)

const deletebyName = ( data ) =>
  utilities.delete('users', 'name', data)
  .then(user => user)

export {
  create,
  findbyGithub,
  findbyName,
  updatebyGithub,
  updatebyName,
  deletebyGithub,
  deletebyName
}
