import express from 'express'
import * as users from '../../database/queries/users.js'

const router = express.Router()

router.get('/github_handle/:github_handle', (request, response) => {
  const { github_handle } = request.params
  users.findbyGithub(github_handle)
  .then( (user) => {response.json( user )
  })
  .catch( err => console.log('err', err) )
})

router.post('/', (request, response) => {
  const attributes = request.body
  users.create(attributes)
  .then( () => response.json( {1: 'success'} ) )
  .catch( err => console.log('err', err) )
})

router.put('/github_handle/:github_handle', (request, response) => {
  const { id } = request.params
  const { attributes } = request.body
  users.updatebyID( id, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

router.delete('/github_handle/:github_handle', (request, response) => {
  const { id } = request.params
  users.deleteByID( id )
  .then( () => response.json( { 'message': 'deleted' } ) )
  .catch( err => console.log('err', err) )
})

export default router
