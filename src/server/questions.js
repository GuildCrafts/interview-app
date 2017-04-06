const questions = require('../database/queries/questions.js')
const utilities = require('../database/queries/utilities.js')

app.get('api/questions/:column/:input', (request, response) => {
  const { column, input } = request.params
  utilities.findAllWhere('questions', column, input)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

app.post('api/questions', (request, response) => {
  const { attributes } = request.body
  questions.create(attributes)
  .then( () => response.json( {1: 'success'} ) )
  .catch( err => console.log('err', err) )
})

app.put('api/questions/:id', (request, response) => {
  const { id } = request.params
  const { attributes } = request.body
  questions.updatebyID( id, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

app.put('api/questions/:level', (request, response) => {
  const { level } = request.params
  const { attributes } = request.body
  questions.updatebyID( level, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

app.delete('api/questions/:id', (request, response) => {
  const { id } = request.params
  questions.deleteByID( id )
  .then( () => response.json( { 1: 'deleted' } ) )
  .catch( err => console.log('err', err) )
})
