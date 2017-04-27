exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('hints', function(table) {
      table.increments('id').primary();
      table.integer('question_id');
      table.string('hints');
      table.foreign('question_id').references('questions.id')
    }),

    knex.schema.createTable('topics', function(table) {
      table.increments('id').primary();
      table.string('topics');
    }),

    knex.schema.createTable('questionTopics', function(table) {
      table.increments('id').primary();
      table.integer('question_id');
      table.integer('topic_id');
      table.foreign('question_id').references('questions.id')
      table.foreign('topic_id').references('topics.id')
    }),

    knex.schema.table('questions', function(table) {
      table.dropColumn('topics'),
      table.dropColumn('hints')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('hints'),
    knex.schema.dropTable('topics'),
    knex.schema.dropTable('questionTopics')
  ])
};
