import chai, { expect } from 'chai'
import * as question from '../../../src/database/queries/questions'

describe('Question Tests', () => {
  const newQuestion = [
    {
      question: "What is the number that represents the meaning of life",
      tags: ["existentialism", "midlife-crisis"],
      level: "10",
      answer: "42",
      prompts: ["Hitchhiking", "Galaxy"],
      score: 12
    },
    {
      question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood",
      tags: ["woodchuckin", "pepperoni"],
      level: "9",
      answer: "a lot",
      prompts: ["Wisconsin", "Wood"],
      score: 20
    },
    {
      question: "What is the most inefficient algorithm",
      tags: ["Don't let Shereef see this", "MachineLearning"],
      level: "0",
      answer: "THE ALGORITHM",
      prompts: ["BubbleSort", "LearnersGuild", "#LGPROBLEMS"],
      score: 1
    }
  ]

  it('Should be type object', () => {
    expect(question).to.be.a('object')
  })

  describe('create a Q', () => {
    it('should create a Q, not a queue', () => {
      return question.create( newQuestion[0] )
        .then( question => {
          expect(question[0].question).to.equal('What is the number that represents the meaning of life')
          expect(question[0].tags).to.eql(["existentialism", "midlife-crisis"])
          expect(question[0].score).to.eql(12)
        })
    })
  })

  describe('find by Tag', () => {
    it('should find a question by the tag', () => {
      return Promise.all([question.create( newQuestion[1] ), question.create( newQuestion[0])])
        .then( () => {
          return question.findbyTag(["woodchuckin", "existentialism"])
          .then( question => {
            expect(question[0].level).to.equal('10')
            expect(question[1].tags[1]).to.equal('pepperoni')
            expect(question.length).to.equal(2)
          })
        })
    })
  })


  describe('find by Level', () => {
    it('should find a question by the level', () => {
      return question.create( newQuestion[1] )
        .then( () => {
          return question.findbyLevel( "9" )
          .then( question => {
            expect(question[0].tags[0]).to.equal("woodchuckin")
          })
        })
    })
  })

  describe('find by ID', () => {
    it('should find a question by the ID', () => {
      return question.create( newQuestion[1] )
        .then( () => {
          return question.findbyID( 1 )
          .then( question => {
            expect(question[0].tags[0]).to.equal("existentialism")
          })
        })
    })
  })

  describe('update by ID', () => {
    it('should update a question by the id', () => {
      return question.create( newQuestion[1] )
        .then( () => {
          return question.updatebyID( 2, {question: 'why do you want to become a full stack developer', answer: "pancakes"} )
          .then( question => {
            expect(question[0].answer).to.equal("pancakes")
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


  describe('delete by Level', () => {
    it('should delete by level', () => {
      return question.create( newQuestion[0] )
        .then( () => {
          return question.deleteByLevel( "yes" )
          .then( question => {
            expect(question[0]).to.equal( undefined )
          })
        })
    })
  })

})
