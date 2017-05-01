exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('interviews', function(table) {
      table.increments('id').primary
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.removeColumn('id'),
  ])
}
