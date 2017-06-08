import express from 'express'
import * as topics from '../../database/queries/topics.js'

const router = express.Router()

router.get('/', (request, response) => {
  topics.all()
  .then(results => response.json( { message: 'Successfully got back topics', topics: results } ))
  .catch( err => {
    console.log('err', err)
    response.json( { error: err.message } )
  } )
})

router.get('/with-questions', (request, response) => {
  topics.withQuestions()
    .then(results => response.json({ message: 'Successfully got back topics', topics: results }))
    .catch( err => {
      console.log('err', err)
      response.json( { error: err.message } )
    } )
})

export default router
