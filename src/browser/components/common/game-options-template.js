const inputModules = [
  {
    "type"    : "Select",
    "prompt"  : "Difficulty",
    "options" : ["any","beginner","intermediate"],
    "tag"     : "level",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "prompt"  : "Topic",
    "options" : ["any","javascript","http","sql"],
    "tag"     : "topic",
    "isOptionRequired": true
  },
  {
    "type"    : "Select",
    "prompt"  : "Game Mode",
    "options" : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"     : "game_mode",
    "isOptionRequired": true
  }
]

module.exports = inputModules
