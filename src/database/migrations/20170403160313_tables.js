exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('github');
    }),

    knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.string('tags');
      table.string('question');
      table.string('difficulty');
      table.string('topic');
      table.string('answer');
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
<<<<<<< HEAD
    knex.schema.dropTable('users'),
=======

    knex.schema.dropTable('users'),

>>>>>>> 71e8e5903530b1df32014e9d174890148d8a48d2
    knex.schema.dropTable('questions'),
  ])

};
