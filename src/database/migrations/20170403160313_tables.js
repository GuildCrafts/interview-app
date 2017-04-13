exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('github_handle');
      table.boolean('approver');
    }),

    knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.specificType('tags', 'jsonb');
      table.string('approval');
      table.string('question');
      table.string('level');
      table.string('answer');
      table.integer('score');
      table.specificType('prompts', 'jsonb')
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('questions'),
  ])

};
