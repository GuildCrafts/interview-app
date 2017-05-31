
exports.up = function(knex, Promise) {
  return knex.schema.table('questions', function(table) {
    table.renameColumn('approval', 'is_approved')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('questions', function(table) {
    table.renameColumn('is_approved', 'approval')
  })
};
