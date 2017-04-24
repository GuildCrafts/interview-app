exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('interviews', function(table) {
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
      table.boolean('is_completed');
      table.text('feedback');
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('interviews'),
  ])
}
