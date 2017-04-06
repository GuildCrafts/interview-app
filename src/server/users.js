const users = require('../database/queries/users.js')

app.get('api/users/:name', (request, response) => {
  const { name } = request.params
  users.findbyName(name)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

app.get('api/users/:github_handle', (request, response) => {
  const { github_handle } = request.params
  users.findbyGithub(github_handle)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

app.post('api/users', (request, response) => {
  const { attributes } = request.body
  users.create(attributes)
  .then( () => response.json( {1: 'success'} ) )
  .catch( err => console.log('err', err) )
})

app.put('api/users/:id', (request, response) => {
  const { id } = request.params
  const { attributes } = request.body
  users.updatebyID( id, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

app.delete('api/users/:id', (request, response) => {
  const { id } = request.params
  users.deleteByID( id )
  .then( () => response.json( { 1: 'deleted' } ) )
  .catch( err => console.log('err', err) )
})
