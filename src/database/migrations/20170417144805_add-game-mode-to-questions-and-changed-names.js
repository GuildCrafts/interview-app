
exports.up = function(knex, Promise) {
  return knex.schema.table('questions', function(table) {
    table.string('game_mode')
  })
  .then( () => knex.schema.table('questions', function(table) {
    table.dropColumn('score')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.integer('points')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.dropColumn('prompts')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.specificType('hints', 'jsonb')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.dropColumn('tags')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.specificType('topics', 'jsonb')
  }))
}

exports.down = function(knex, Promise) {
  return knex.schema.table('questions', function(table) {
    table.dropColumn('game_mode')
  })
  .then( () => knex.schema.table('questions', function(table) {
    table.dropColumn('points')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.integer('score')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.dropColumn('hints', 'jsonb')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.specificType('prompts')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.dropColumn('topics', 'jsonb')
  }))
  .then( () => knex.schema.table('questions', function(table) {
    table.specificType('tags')
  }))
}
