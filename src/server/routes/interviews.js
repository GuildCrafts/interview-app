import express from 'express'
import * as interviews from '../../database/queries/interviews.js'
import * as utilities from '../../database/queries/utilities.js'

const router = express.Router()

router.post('/', (request, response) => {
  const attributes = request.body
  interviews.create(attributes, request.user.handle)
  .then( () => response.json({message: 'Successfully created interview'}))
  .catch( err => response.json({error: err.message}))
})

router.put('/submit_feedback', (request, response) => {
  const feedback = request.body.feedback
  interviews.update(attributes, request.user.handle)
  .then( () => response.json({message: 'Successfully submitted feedback'}))
  .catch( err => response.json({error: err.message}))
})

export default router
