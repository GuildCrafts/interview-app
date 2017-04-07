// in server.js
import express from 'express'
import pgp from 'pg-promise'
import bodyParser from 'body-parser'
import path from 'path'
import { parseConfig, getEnv } from './src/config/config'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'

const compiler = webpack(webpackConfig)
const app = express()
const router = express.Router()

import questions from './src/server/routes/questions.js'
import users from './src/server/routes/users.js'

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( {extended: false}) )
app.use( express.static(__dirname + '/public/dist/') );
app.use( express.static(__dirname + '/src/browser/') );

app.use('/api/users', users)
app.use('/api/questions', questions)

// 404 error handler
// app.use( (request, response, next) => {
//   let err = new Error('404 Not Found')
//   err.status = 404
//   next(err)
// })

//error handler
app.use( (error, request, response, next) => {
  response.locals.message = error.messages
  response.locals.error = request.app.get('env') === 'development' ? error : {}
  console.error(error)
//render error page
  response.status(error.status || 500)
  response.json({error: error.stack})


if(getEnv() === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    filename: webpackConfig.output.filename,
    serverSideRender: false,
    stats: {
      color: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }))
}

app.use(express.static(__dirname + '/public/dist/'));
app.use(express.static(__dirname + '/src/browser/main.js'));

/* GET home page. */
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'src/browser/index.html'))

})

// Heroku bydefault set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this

app.listen(process.env.PORT || 4000);

export default app
