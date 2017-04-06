import chai, { expect } from 'chai'
import * as question from '../src/database/queries/questions'

describe('Question Tests', () => {
  const newQuestion = [
    {
      tags: "existentialism",
      question: "What is the number that represents the meaning of life",
      difficulty: "yes",
      topic: "true facts",
      answer: "42"
    },
    {
      tags: "woodchuckin'",
      question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood",
      difficulty: "NOPE",
      topic: "free response",
      answer: "a lot"
    },
    {
      tags: "Don't let Shereef see this",
      question: "What is the most inefficient algorithm",
      difficulty: "ehhh",
      topic: "Painful truths",
      answer: "THE ALGORITHM"
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
        })
    })
  })

  describe('find by Tag', () => {
    it('should find a question by the tag', () => {
      return question.create( newQuestion[1] )
        .then( () => {
          return question.findbyTag( "woodchuckin'" )
          .then( question => {
            expect(question[0].topic).to.equal('free response')
          })
        })
    })
  })

  describe('find by Topic', () => {
    it('should find a question by the topic', () => {
      return question.create( newQuestion[2] )
        .then( () => {
          return question.findbyTopic( "Painful truths" )
          .then( question => {
            expect(question[0].tags).to.equal("nothing to see here")
          })
        })
    })
  })

  describe('find by Difficulty', () => {
    it('should find a question by the difficulty', () => {
      return question.create( newQuestion[1] )
        .then( () => {
          return question.findbyDifficulty( "NOPE" )
          .then( question => {
            expect(question[0].topic).to.equal("free response")
          })
        })
    })
  })

  describe('update by Tag', () => {
    it('should update a question by the tag', () => {
      return question.create( newQuestion[1] )
        .then( () => {
          return question.updatebyTag( "woodchuckin'", {question: 'why do you want to become a full stack developer', answer: "pancakes"} )
          .then( question => {
            expect(question[0].answer).to.equal("pancakes")
          })
        })
    })
  })

  describe('update by Topic', () => {
    it('should update a question by the topic', () => {
      return question.create( newQuestion[0] )
        .then( () => {
          return question.updatebyTopic( "true facts", {tags: "life"} )
          .then( question => {
            expect(question[0].tags).to.equal("life")
          })
        })
    })
  })

  describe('update by Difficulty', () => {
    it('should update a question by the difficulty', () => {
      return question.create( newQuestion[2] )
        .then( () => {
          return question.updatebyDifficulty( "ehhh", {tags: "nothing to see here"} )
          .then( question => {
            expect(question[0].tags).to.equal("nothing to see here")
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

  describe('delete by Topic', () => {
    it('should delete by topic', () => {
      return question.create( newQuestion[0] )
        .then( () => {
          return question.deleteByTopic( "existentialism" )
          .then( question => {
            expect(question[0]).to.equal( undefined )
          })
        })
    })
  })

  describe('delete by Difficulty', () => {
    it('should delete by difficulty', () => {
      return question.create( newQuestion[0] )
        .then( () => {
          return question.deleteByDifficulty( "yes" )
          .then( question => {
            expect(question[0]).to.equal( undefined )
          })
        })
    })
  })

})
