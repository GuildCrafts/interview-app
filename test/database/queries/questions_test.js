import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
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

  it('Should be type object', () => {
    expect(question).to.be.a('object')
  })

  describe.only('create a new question', () => {
    it('should create a new question', () => {
      return question.create( sampleQuestions[0] )
      .then(createdQuestionID => {
        return question.findbyID(createdQuestionID)
        .then(newQuestion => {
          expect(newQuestion.question).to.equal('What is the number that represents the meaning of life')
          expect(newQuestion.points).to.eql(1)
          expect(newQuestion.game_mode).to.eql("Questions and Answers")
        })
      })
    })
  })

  describe.only('update by ID', () => {
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

  describe.only('find by topic', () => {
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

  describe.only('find by Level', () => {
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

  describe.only('find by ID', () => {
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

  describe('update by Level', () => {
    it('should update a question by the level', () => {
      return question.create( newQuestion[2] )
        .then( () => {
          return question.updatebyLevel( '0', {level: '1000'} )
          .then( question => {
            expect(question[0].level).to.equal('1000')
          })
        })
    })
  })

  describe('delete by Question', () => {
    it('should delete a question', () => {
      return question.create( newQuestion[0] )
        .then( () => {
          return question.deleteByQuestion( "What is the number that represents the meaning of life" )
          .then( question => {
            expect(question[0]).to.equal( undefined )
          })
        })
    })
  })


  describe('delete by ID', () => {
    it('should delete by ID', () => {
      return question.create( newQuestion[0] )
        .then( () => {
          return question.deleteByID( '1', "yes" )
          .then( question => {
            expect(question[0]).to.equal( undefined )
          })
        })
    })
  })

})
