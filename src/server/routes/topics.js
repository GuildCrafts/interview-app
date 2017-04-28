import express from 'express'
import * as questions from '../../database/queries/questions.js'

const router = express.Router()

router.get('/', (request, response) => {
  questions.getAllTopics()
  .then(results => response.json(results))
  .catch( err => console.log('err', err) )
})

router.post('/', (request, response) => {

})

export default router
