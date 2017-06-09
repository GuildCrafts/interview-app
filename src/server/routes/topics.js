import express from 'express'
import * as topics from '../../database/queries/topics.js'

const router = express.Router()

router.get('/', (request, response) => {
  topics.all()
  .then(results => response.json({message: "Retrieved all topics", topics: results}))
  .catch( err => console.log('err', err) )
})

router.get('/with-questions', (request, response) => {
  topics.withQuestions()
    .then(results => response.json(results))
    .catch( err => console.log('err', err) )
})

export default router
