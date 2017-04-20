import express from 'express'

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
  users.updatebyGithub( data, attributes )
  .then( users => response.json(users[0]) )
  .catch( err => console.log('err ROUTES 3', err) )
})

router.get('/current_user', (request, response) => {
  response.json(request.user)
})

export default router
