import express from 'express'
import authInitialize from './src/config/auth'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import { parseConfig, getEnv } from './src/config/config'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'
import questions from './src/server/routes/questions'
import users from './src/server/routes/users'

const compiler = webpack(webpackConfig)
const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


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


app.use(express.static(__dirname + '/public/javascripts/'));
app.use(express.static(__dirname + '/public/dist/'));
app.use(express.static(__dirname + '/public/images/'));
app.use(express.static(__dirname + '/src/browser/main.js'));

authInitialize(app)

app.use('/api/users', users)
app.use('/api/questions', questions)


/* GET home page. */
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'src/browser/index.html'))
})

// Heroku bydefault set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this

app.listen(process.env.PORT || 3000);

export default app
