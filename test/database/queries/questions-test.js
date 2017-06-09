import chai, { expect } from 'chai'
import * as question from '../../../src/database/queries/questions'
import knex from '../../../src/database/db.js'

describe('Question Tests', () => {

  beforeEach(() => {
    return knex.raw('truncate table ' + 'questions' + ' cascade')
  })

  const sampleQuestions = [
    {
      question: "What is the number that represents the meaning of life",
      topics: ["core-javascript", "functional-programming"],
      level: "beginner",
      answer: "42",
      game_mode: "Questions and Answers",
      hints: ["Hitchhiking", "Galaxy"],
      points: 1
    },
    {
      question: "What is the most inefficient algorithm",
      topics: ["functional-programming"],
      level: "intermediate",
      answer: "THE ALGORITHM",
      game_mode: "Questions and Answers",
      hints: ["BubbleSort", "LearnersGuild", "#LGPROBLEMS"],
      points: 3
    },
    {
      question: "What is the worst question",
      topics: ["core-javascript"],
      level: "jedi",
      answer: "This one",
      game_mode: "Questions and Answers",
      hints: ["Sort"],
      points: 5
    }
  ]

  const sampleArray = [
    {
      id: 2,
      question: 'What is state',
      answer: 'holds data',
      level: 'beginner',
      hints: 'var',
      game_mode: null,
      points: 2,
      topics: 'functional-programming',
      is_approved: false
    },
    {
      id: 5,
      question: 'What is a function',
      answer: 'stuff',
      level: 'beginner',
      hints: null,
      game_mode: null,
      points: null,
      topics: 'core-javascript',
      is_approved: true
    }
  ]


  it('Should be type object', () => {
    expect(question).to.be.a('object')
  })

  describe('create a new question', () => {
    it('should create a new question', () => {
      return question.create( sampleQuestions[0] )
      .then(createdQuestionID => {
        return question.findbyID(createdQuestionID)
        .then(newQuestion => {
          expect(newQuestion.question).to.equal('What is the number that represents the meaning of life')
          expect(newQuestion.points).to.eql(1)
          //expect(newQuestion.game_mode).to.eql("Questions and Answers")

        })
      })
    })
  })

  describe('update by ID', () => {
    it('should update a question by the ID', () => {
      return question.create( sampleQuestions[1] )
      .then(createdQuestionID => {
        return question.findbyID(createdQuestionID)
        .then(newQuestion => {
          newQuestion.level = 'beginner'
          return question.updatebyID(newQuestion)
        })
        .then( () => createdQuestionID)
      })
      .then(createdQuestionID => {
        return question.findbyID( createdQuestionID )
        .then( result => {
          expect(result.level).to.equal('beginner')
        })
      })
    })
  })

  describe('find by topic', () => {
    it('should find a question by the topic', () => {
      return Promise.all([question.create( sampleQuestions[1] ), question.create( sampleQuestions[0])])
      .then( () => {
        return question.findbyTopic(['core-javascript'])
        .then( questions => {
          expect(questions.length).to.equal(1)
          expect(questions[0].topics).to.eql(['core-javascript'])
        })
      })
      .then( () => {
        return question.findbyTopic(['functional-programming'])
        .then( questions => {
          expect(questions.length).to.equal(2)
        })
      })
    })
  })

  describe('find by Level', () => {
    it('should find a question by the level', () => {
      return Promise.all(sampleQuestions.map( sampleQuestion => {
        return question.create(sampleQuestion)
      }))
      .then( () => {
        return question.findbyLevel( 'jedi' )
        .then( questions => {
          expect(questions.length).to.equal(1)
        })
      })
    })
  })

  describe('find by ID', () => {
    it('should find a question by the ID', () => {
      return question.create( sampleQuestions[1] )
      .then( (id) => {
        return question.findbyID( id )
        .then( question => {
          expect( question.question ).to.eql( sampleQuestions[1].question )
        })
      })
    })
  })

  describe('delete by ID', () => {
    it('should delete by ID', () => {
      return question.create( sampleQuestions[2] )
        .then( ( id ) => {
          return question.deletebyID( id )
          .then( question => {
            expect(question[0]).to.equal( undefined )
          })
        })
    })
  })
  
  describe('hintTopicMiddleWare', () => {
    it('should convert hints and topics into arrays', () => {
      const hintsAndTopics = question.hintTopicMiddleWare(sampleArray)
      expect(hintsAndTopics[0].hints).to.be.an('array')
      expect(hintsAndTopics[0].topics).to.be.an('array')
      expect(hintsAndTopics).to.have.length(2)
    })
  })
})
