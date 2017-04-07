import express from 'express'
import * as users from '../../database/queries/users.js'

const router = express.Router()

router.get('/:name', (request, response) => {
  const { name } = request.params
  users.findbyName(name)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

router.get('/:github_handle', (request, response) => {
  const { github_handle } = request.params
  users.findbyGithub(github_handle)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

router.post('/', (request, response) => {
  const { attributes } = request.body
  users.create(attributes)
  .then( () => response.json( {1: 'success'} ) )
  .catch( err => console.log('err', err) )
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { attributes } = request.body
  users.updatebyID( id, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  users.deleteByID( id )
  .then( () => response.json( { 1: 'deleted' } ) )
  .catch( err => console.log('err', err) )
})

export default router
