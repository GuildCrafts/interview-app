exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('candidate', function(table) {
      table.increments('id').primary();
      table.string('role');
      table.string('experience');
      table.string('level');
      table.string('average_time_per_question');
      table.string('notes');
    }),
    knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.string('question');
      table.string('difficulty');
      table.string('topic');
      table.string('points');
      table.string('time');
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('candidate'),
    knex.schema.dropTable('questions'),
  ])

};
