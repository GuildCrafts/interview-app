import knex from '../db.js'

const utilities = {
  create: (table, attributes) => {
    return knex
      .table(table)
      .insert(attributes)
      .returning('*')
  },

  findAllWhere: (table, column, data) => {
    return knex
      .table(table)
      .where(column, data)
      .returning('*')
  },

  findAllWhereRaw: (table, rawSql) => {
    return knex
      .table(table)
      .where(knex.raw(rawSql))
      .returning('*')
  },

  findAll: (table) => {
    return knex
      .table(table)
      .returning('*')
  },
  
  update: (table, column, data, attributes) => {
    return knex
      .table(table)
      .where(column, data)
      .update(attributes)
      .returning('*')
  },

  delete: (table, column, data) => {
    return knex
      .table(table)
      .where(column, data)
      .del()
  }
}

module.exports = utilities
