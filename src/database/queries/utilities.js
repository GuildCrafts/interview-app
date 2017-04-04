import knex from '../db.js'

const Things = {
  createThing: (table, attributes) => {
    knex
      .table(table)
      .insert(attributes)
      .returning('*')
  },

  findAllWhere: (table, column, data) => {
    knex
      .table(table)
      .where(column, data)
      .returning('*')
  },

  findAll: () => {
    knex
      .table(table)
      .returning('*')
  },

  updateThing: (table, column, data, attributes) => {
    knex
      .table(table)
      .where(column, data)
      .update(attributes)
      .returning(1)
  },

  deleteThing: (table, column, data) => {
    knex
      .table(table)
      .where(column, data)
      .del()
  }
}

module.exports = Things
