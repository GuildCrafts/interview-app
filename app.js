// in server.js
import express from 'express'
import path from 'path'
import webpack from 'webpack'

const app = express()

if(getEnv() === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
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
  app.use(require('webpack-hot-middleware')(compiler))
}


app.use(express.static(__dirname + '/public/dist/'));
app.use(express.static(__dirname + '/src/browser/'));


/* GET home page. */
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'src/browser/index.html'))
})

// Heroku bydefault set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this
app.listen(process.env.PORT || 4000);
