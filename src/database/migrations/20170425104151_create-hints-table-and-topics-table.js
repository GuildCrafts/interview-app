exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('hints', function(table) {
      table.increments('id').primary();
      table.integer('question_id');
      table.string('text');
      table.foreign('question_id').references('questions.id').onDelete('cascade')
    }),

    knex.schema.createTable('topics', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('questionTopics', function(table) {
      table.increments('id').primary();
      table.integer('question_id');
      table.integer('topic_id');
      table.foreign('question_id').references('questions.id').onDelete('cascade')
      table.foreign('topic_id').references('topics.id').onDelete('cascade')
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
    knex.schema.dropTable('questionTopics'),
    knex.schema.dropTable('topics'),
  ])
};
