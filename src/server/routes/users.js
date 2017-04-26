import express from 'express'
import * as users from '../../database/queries/users'

const router = express.Router()

router.get('/github_handle/:github_handle', (request, response) => {
  const github_handle = request.params
  users.findbyGithub(github_handle)
  .then( (user) => {response.json( user )
  })
  .catch( err => console.log('err ROUTES 1', err) )
})

router.post('/', (request, response) => {
  const attributes = request.body
  users.create(attributes)
  .then( () => response.json(attributes) )
  .catch( err => console.log('err ROUTES 2', err) )
})

router.put('/github_handle/:github_handle', (request, response) => {
  const data = request.params
  const attributes = request.body
  users.updatebyGithub(data, attributes)
  .then( users => response.json(users[0]) )
  .catch( err => console.log('err ROUTES 3', err) )
})

router.get('/current_user', (request, response) => {
  users.findbyGithub(request.user.handle)
  .then( user => {
    if( !user ) {
      const attributes = {
        name: request.user.name,
        github_handle: request.user.handle,
        approver: false
      }
      return users.create(attributes)
        .then( newUser => response.json(newUser) )
        .catch( err => console.log('err ROUTES 4-1', err) )
    }
    response.json(user)
  })
  .catch( err => console.log('err ROUTES 4-2', err) )
})

export default router
