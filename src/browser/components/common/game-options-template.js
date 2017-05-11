const inputModules = [
  {
    "type"    : "Select",
    "label"  : "Difficulty",
    "options" : ["any","beginner","intermediate"],
    "tag"     : "level",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "label"  : "Topic",
    "options" : ["any","javascript","http","sql"],
    "tag"     : "topic",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "label"  : "Game Mode",
    "options" : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"     : "game_mode",
    "isOptionRequired": true
  }
]

module.exports = inputModules
