// in server.js
const express = require('express');
const app = express();
const cors = require('cors')
const pgp = require('pg-promise')
const bodyParser = require('body-parser')
const questions = require('./src/database/queries/questions.js')
const users = require('./src/database/queries/users.js')

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( {extended: false}) )
app.use( express.static(__dirname + '/public/dist/') );
app.use( express.static(__dirname + '/src/browser/') );
app.use( cors() )

app.get('/users/:name', (request, response) => {
  const { name } = request.params
  users.findbyName(name)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

app.get('/users/:github_handle', (request, response) => {
  const { github_handle } = request.params
  users.findbyGithub(github_handle)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

app.get('/questions/tags/:tags', (request, response) => {
  const { tags } = request.params
  questions.findbyTag(tags)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

app.get('/questions/level/:level', (request, response) => {
  const { level } = request.params
  questions.findbyLevel(level)
  .then( results => response.json( results ) )
  .catch( err => console.log('err', err) )
})

app.post('/questions', (request, response) => {
  const { attributes } = request.body
  questions.create(attributes)
  .then( () => response.json( {1: 'success'} ) )
  .catch( err => console.log('err', err) )
})

app.post('/users', (request, response) => {
  const { attributes } = request.body
  users.create(attributes)
  .then( () => response.json( {1: 'success'} ) )
  .catch( err => console.log('err', err) )
})

app.put('/questions/:id', (request, response) => {
  const { id } = request.params
  const { attributes } = request.body
  questions.updatebyID( id, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

app.put('/questions/:level', (request, response) => {
  const { level } = request.params
  const { attributes } = request.body
  questions.updatebyID( level, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})

app.put('/users/:id', (request, response) => {
  const { id } = request.params
  const { attributes } = request.body
  users.updatebyID( id, attributes )
  .then( () => response.json( { 1: 'success' } ) )
  .catch( err => console.log('err', err) )
})


app.delete('/questions/:id', (request, response) => {
  const { id } = request.params
  questions.deleteByID( id )
  .then( () => response.json( { 1: 'deleted' } ) )
  .catch( err => console.log('err', err) )
})

app.delete('/users/:id', (request, response) => {
  const { id } = request.params
  users.deleteByID( id )
  .then( () => response.json( { 1: 'deleted' } ) )
  .catch( err => console.log('err', err) )
})


// Heroku by default set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this
app.listen(process.env.PORT || 4000);
