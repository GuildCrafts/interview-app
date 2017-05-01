const inputModules = [
  {
    "type"       : "Input",
    "placeholder": "Enter your question",
    "prompt"     : "Question",
    "tag"        : "question",
    "value"      : ""
  },
  {
    "type"       : "Input",
    "placeholder": "Answer it thoroughly",
    "prompt"     : "Answer",
    "tag"        : "answer",
    "value"      : ""
  },
  {
    "type"            : "Select",
    "prompt"          : "Game Mode",
    "options"         : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"             : "game_mode",
    "isOptionRequired": true,
    "chooseSelect"    : ""
  },
  {
    "type"   : "Checkbox",
    "options": ["Core JavaScript", "SQL", "Functional Programming", "Requirements", "Testing", "Technical Design", "Object Oriented Programming" ],
    "prompt" : "Topics",
    "tag"    : "topics",
    "checked": ""
  },
  {
    "type"   : "Radio",
    "options": ["Beginner", "Intermediate", "Advanced", "Jedi"],
    "prompt" : "Difficulty Level",
    "tag"    : "level",
    "checked": ""
  },
  {
    "type"            : "Select",
    "prompt"          : "Points",
    "options"         : [1, 2, 3, 4, 5],
    "tag"             : "points",
    "isOptionRequired": true,
    "chooseSelect"    : ""
  },
  {
    "type"            : "Hint",
    "prompt"          : "Hints",
    "tag"             : "hints",
    "placeholder"     : "Write a helpfull hint"
  }
]

module.exports = inputModules
