import express from 'express'
import * as questions from '../../database/queries/questions.js'
import * as utilities from '../../database/queries/utilities.js'

const router = express.Router()

router.get('/', (request, response) => {
  const {difficulty, topics} = request.query
  questions.findAllQuestions('questions')
  .then( questions => { response.json(questions) })
  .catch( err => console.log('err', err) )
})

router.post('/', (request, response) => {
  const attributes  = request.body
  questions.create( attributes )
  .then( (question) => response.json( question ) )
  .catch( err => { console.log(err.message); console.error(err); response.status(400).json({error: err.message, params: attributes}) })
})

router.get('/approval', (request, response) => {
  questions.findAllQuestions()
  .then( questions => {
    response.send(questions)
  })
})

router.delete('/approval/:id', (request, response) => {
  const { id } = request.params
  questions.deleteByID( id )
  .then( () => response.json( { 'message': 'deleted' } ) )
  .catch( err => console.log('err', err) )
})

router.put('/approval/:id', (request, response) => {
  const attributes = request.body
  questions.updatebyID( attributes )
  .then( questions => response.json(questions) )
  .catch( err => console.log('err', err) )
})

router.get('/:id', (request, response) => {
  const { id } = request.params
  const attributes = request.body
  questions.findbyID( id, attributes )
  .then( question => response.json( question ) )
  .catch( err => console.log('err', err) )
})

export default router
