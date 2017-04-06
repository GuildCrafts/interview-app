// in server.js
const express = require('express');
const app = express();
const cors = require('cors')
const pgp = require('pg-promise')
const bodyParser = require('body-parser')
const questions = require('./src/routes/questions.js')
const users = require('./src/routes/users.js')

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( {extended: false}) )
app.use( express.static(__dirname + '/public/dist/') );
app.use( express.static(__dirname + '/src/browser/') );
app.use( cors() )

// Heroku by default set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this
app.listen(process.env.PORT || 4000);
