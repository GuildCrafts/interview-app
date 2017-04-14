import express from 'express'
import * as questions from '../../database/queries/questions.js'
import * as utilities from '../../database/queries/utilities.js'

const router = express.Router()

router.get('/', (request, response) => {
  const {difficulty, topics} = request.params
  utilities.findAll('questions')
  .then( questions => {
    if(difficulty !== 'any') {
      questions = questions.filter( questions => !questions.difficulty )
    }
    if(topics !== 'any') {
      questions = questions.filter( questions => !questions.topics )
    }
    response.json(questions)
  })
  .catch( err => console.log('err', err) )
})

router.post('/', (request, response) => {
  const attributes  = request.body
  questions.create( attributes )
  .then( (question) => response.json( question ) )
  .catch( err => console.log('err', err) )
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const attributes = request.body
  questions.updatebyID( id, attributes )
  .then( questions => response.json(questions[0]) )
  .catch( err => console.log('err', err) )
})

router.get('/:id', (request, response) => {
  const { id } = request.params
  const attributes = request.body
  questions.findbyID( id, attributes )
  .then( question => response.json( question ) )
  .catch( err => console.log('err', err) )
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  questions.deleteByID( id )
  .then( () => response.json( { 'message': 'deleted' } ) )
  .catch( err => console.log('err', err) )
})

export default router
