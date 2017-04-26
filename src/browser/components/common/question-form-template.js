const inputModules = [
  {
    "type"       : "Input",
    "placeholder": "Enter your question",
    "prompt"     : "Question",
    "tag"        : "question"
  },
  {
    "type"       : "Input",
    "placeholder": "Answer it thoroughly",
    "prompt"     : "Answer",
    "tag"        : "answer"
  },
  {
    "type"            : "Select",
    "prompt"          : "Game Mode",
    "options"         : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"             : "game_mode",
    "isOptionRequired": true
  },
  {
    "type"   : "Checkbox",
    "options": ["Core-JavaScript","Functional-Programming"],
    "prompt" : "Topics",
    "tag"    : "topics"
  },
  {
    "type"   : "Radio",
    "options": ["Beginner", "Intermediate", "Advanced", "Jedi"],
    "prompt" : "Difficulty Level",
    "tag"    : "level"
  },
  {
    "type"            : "Select",
    "prompt"          : "Points",
    "options"         : ['1', '2', '3', '4', '5'],
    "tag"             : "points",
    "isOptionRequired": true
  },
  {
    "type"            : "Hint",
    "prompt"          : "Hints",
    "tag"             : "hints",
    "placeholder"     : "Write a helpfull hint",
  }
]

module.exports = inputModules
