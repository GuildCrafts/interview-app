
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hints').del()
  .then( ()=> knex('questionTopics').del())
  .then( ()=> knex('topics').del())
  .then( ()=> knex('questions').del())
  .then(function () {
    // Inserts seed entries
    return knex('questions').insert([
      {
        id:1,
        question:'What is a closure',
        answer:'magic',
        approval:false,
        level:'Intermediate',
        points:4
      },
      {
        id:2,
        question:'What is state',
        answer:'holds data',
        approval:true,
        level:'Beginner',
        points:2
      }
    ]);
  })
  .then(function () {
    return knex('hints').insert([
      {
        text:'lexical',
        question_id:1
      },
      {
        text:'variable',
        question_id:1
      },
      {
        text:'var',
        question_id:2
      }
    ])
  })

  .then(function () {
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
  })
  .then(function () {
    return knex('questionTopics').insert([
      {
        question_id:1,
        topic_id:1,
      },
      {
        question_id:1,
        topic_id:2,
      },
      {
        question_id:2,
        topic_id:2,
      }
    ])
  })
};
