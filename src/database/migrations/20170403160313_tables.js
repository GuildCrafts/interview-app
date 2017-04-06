exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('github');
    }),
    
    knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.array('tags');
      table.string('question');
      table.string('difficulty');
      table.string('topic');
      table.string('answer');
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('candidate'),
    knex.schema.dropTable('questions'),
  ])

};
