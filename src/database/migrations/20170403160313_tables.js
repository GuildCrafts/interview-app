exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('github');
    }),

    knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.specificType('tags', 'jsonb');
      table.string('question');
      table.string('level');
      table.string('answer');
      table.string('prompts')
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('questions'),
  ])

};
