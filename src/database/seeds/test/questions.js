
exports.seed = function(knex, Promise) {
  // Inserts seed topics
  return knex('topics').insert([
    {
      id:1,
      name:'core-javascript',
    },
    {
      id:2,
      name:'functional-programming',
    }
  ])
}
