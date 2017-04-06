import { getEnv } from '../config/config'

const makeKnexConfig = env => {
  const connectionString = process.env.DATABASE_URL ||
   `postgres://${process.env.USER}@localhost:5432/interviewdb-${env}`

  return {
    client: 'postgresql',
    connection: connectionString,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: __dirname + `/build/server/database/seeds/${env}`
    }
  }
}

const knexConfig = makeKnexConfig( getEnv() )

module.exports = knexConfig
