import express from 'express'
import * as questions from '../../database/queries/questions.js'
import * as utilities from '../../database/queries/utilities.js'

const router = express.Router()


router.get('/', (request, response) => {
  const {difficulty, topics} = request.params
  console.log('request.params >>>>', request.params)
  utilities.findAll('questions')
  .then( questions => {
    console.log('questions >>>>', questions)

      if(difficulty !== 'any') {
        questions = questions.filter( questions => !questions.difficulty )
      }
      if(topics !== 'any') {
        questions = questions.filter( questions => !questions.topics )
      }
      response.json(questions)
  })
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