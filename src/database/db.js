import Knex from 'knex'
import knexConfig from './knexfile'

const knex = Knex( knexConfig )


// const makePancake = (table, data) =>
// Knex ( table ).insert( data ).returning('*')

export default knex
