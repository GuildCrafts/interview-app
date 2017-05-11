
exports.up = function(knex, Promise) {
  return knex.schema.table('questions', function(table) {
    table.dropColumns('question', 'answer', 'approval')
  }) .then( () => knex.schema.table('questions', function(table) {
    table.text('question')
  })).then( () => knex.schema.table('questions', function(table) {
    table.text('answer')
  })) .then( () => knex.schema.table('questions', function(table) {
    table.boolean('approval')
  }))
};

exports.down = function(knex, Promise) {
  return knex.schema.table('questions', function(table) {
    table.dropColumns('question', 'answer', 'approval')
  }) .then( () => knex.schema.table('questions', function(table) {
    table.string('question')
  })).then( () => knex.schema.table('questions', function(table) {
    table.string('answer')
  })) .then( () => knex.schema.table('questions', function(table) {
    table.string('approval')
  }))

};
