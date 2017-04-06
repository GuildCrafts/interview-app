import pg from 'pg'
import fs from 'fs'
import path from 'path'

const getEnv = () =>
  process.env.NODE_ENV || 'development'

const envPath = '.env.' + getEnv()

if ( fs.existsSync(envPath) ) {
  require('dotenv').config({path: `${envPath}`})
}

let config

const parseConfig = () => {
  if ( config ) {
    return config
  }
    const filepath = path.join(__dirname, `./${getEnv()}.json`)
    try {
      config = JSON.parse(fs.readFileSync(filepath).toString())
      return config
    } catch(error) {
      throw new Error(`NODE_ENV points to invalid filepath:  ${filepath}`)
    }
}

export { getEnv, parseConfig }
