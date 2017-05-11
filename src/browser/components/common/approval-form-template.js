const inputModules = [
  {
    "type"       : "Input",
    "placeholder": "Enter your question",
    "label"     : "Question",
    "tag"        : "question",
    "value"      : ""
  },
  {
    "type"       : "Input",
    "placeholder": "Answer it thoroughly",
    "label"     : "Answer",
    "tag"        : "answer",
    "value"      : ""
  },
  {
    "type"            : "Select",
    "label"          : "Game Mode",
    "options"         : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"             : "game_mode",
    "isOptionRequired": true,
    "chooseSelect"    : ""
  },
  {
    "type"   : "Checkbox",
    "options": ["Core JavaScript", "SQL", "Functional Programming", "Requirements", "Testing", "Technical Design", "Object Oriented Programming" ],
    "label" : "Topics",
    "tag"    : "topics",
    "checked": ""
  },
  {
    "type"   : "Radio",
    "options": ["Beginner", "Intermediate", "Advanced", "Jedi"],
    "label" : "Difficulty Level",
    "tag"    : "level",
    "checked": ""
  },
  {
    "type"            : "Select",
    "label"          : "Points",
    "options"         : [1, 2, 3, 4, 5],
    "tag"             : "points",
    "isOptionRequired": true,
    "chooseSelect"    : ""
  },
  {
    "type"            : "Hint",
    "label"          : "Hints",
    "tag"             : "hints",
    "placeholder"     : "Write a helpfull hint"
  }
]

module.exports = inputModules
