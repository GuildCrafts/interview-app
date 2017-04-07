import express from 'express'
import * as questions from '../../database/queries/questions.js'
import * as utilities from '../../database/queries/utilities.js'

const router = express.Router()

router.get('/:column/:input', (request, response) => {
  const { column, input } = request.params
  utilities.findAllWhere('questions', column, input)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

router.post('/questions', (request, response) => {
  const { attributes } = request.body
  questions.create(attributes)
  .then( () => response.json( {1: 'success'} ) )
  .catch( err => console.log('err', err) )
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { attributes } = request.body
  questions.updatebyID( id, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

router.put('/:level', (request, response) => {
  const { level } = request.params
  const { attributes } = request.body
  questions.updatebyID( level, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  questions.deleteByID( id )
  .then( () => response.json( { 1: 'deleted' } ) )
  .catch( err => console.log('err', err) )
})

export default router
