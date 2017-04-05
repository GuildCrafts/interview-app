# interview-app
Build an app that allows for a pair of Learners to mock interview each other.

This app will have multiple phases to build out different interview modes. Please read through all phases in order to understand the eventual scale of the project. This should help you develop a modular programming mindset when designing the base components.

*Modular programming: Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.*

## Specifications
Create an app that has two player roles; the candidate and the interviewer. Eventually, there will be multiple modes. These modes will effect the questions required, the method the answers are submitted, the time limit, and the interaction of both players. Below are user stories that should apply to every potential mode.

- [ ] Github login authentication
- [ ] After logging in, user's stats will appear in the header (score/experience, level, number of questions answered)
- [ ] Start page where user can select:
 - Game mode
 - Player role
 - Level
 - Topic


 - [ ] For every mode, the following should be true for candidates and interviewers:

##### Candidate:
  - [ ] Will be presented with one technical question at a time
  - [ ] The game mode will determine the format of the question
  - [ ] The game mode will determine the format of how the answer is submitted
  - [ ] Game mode, difficulty level, score, and topic are all shown (statically) in the header
  - [ ] Score increases when candidate answers correctly
  - [ ] Interviewer determines if answers are correct or incorrect. Candidate can not move to the next question until interviewer deems an answer is correct

##### Interviewer:
  - [ ] Can see answer to question (or multiple answers, depending on the question)
  - [ ] Space to take optional notes during the mock interview
  - [ ] Has a list of prompts to if the candidate gets stuck
  - [ ] Game mode, difficulty level, score, and topic are all shown (statically) in the header
  - [ ] Interviewer determines if answers are correct or incorrect. Candidate can not move to the next question until interviewer deems an answer is correct

### Phase 1: Setup
- [ ] Create database with tables for candidate and questions (one question table per game mode), which include the following columns:

1) Candidate:
- score/experience
- rank/level
- average time to answer question

2) Questions:
- level
- topic
- point value
- time limit

- [ ] Kindly ask Pro-Players for a list of questions. Use this list to populate the questions table.
- [ ] Create questions tags: difficulty level, topic, and time limit
- [ ] App must have a score/experience tracker
- [ ] App must have a time tracker
- [ ] App must have a space for interviewer to write notes during the mock interview
- [ ] Questions increase in difficulty, starting with minor syntax and format errors, ending with misused methods and functions
- [ ] When interviewer submits notes, they become available to candidate and are recorded in the candidate's profile (written to the database)


### Phase 2: Speaking Mode
- [ ] Create a new questions table in database for Speaking questions (Mimics Speaking Questions)
- [ ] Interviewer will ask questions, then mark "correct" or "incorrect" or "pass"
- [ ] Questions in speaking mode will be verbally answered by candidate
- [ ] Questions will be evaluated by a true or false score
- [ ] Questions increase in difficulty, starting with minor syntax and format errors, ending with misused methods and functions
- [ ] Interviewer will have a list of process provoking prompts per whiteboard question

### Phase 3: Whiteboard Mode
- [ ] Create a new questions table in database for Whiteboard questions (Mimics Speaking Questions)
- [ ] Whiteboard questions will require candidate to write out their responses on a whiteboard and submit their responses as an image
- [ ] Questions should be evaluated by a percentage score
- [ ] Questions increase in difficulty, starting with minor syntax and format errors, ending with misused methods and functions
- [ ] Interviewer will facilitate the candidate's whiteboard session
- [ ] Interviewer will have a list of process provoking prompts per whiteboard question
- [ ] Interviewer will have multiple solution methods available to review while the candidate is whiteboarding.

### Phase 4: Coding Mode
- [ ] Create new questions table in database for Coding questions (Mimics Speaking Questions)
- [ ] Per questions, candidate has the option between focusing on diagraming, pseudocode, and formal code, or all three.
- [ ] Questions increase in difficulty, starting with minor syntax and format errors, ending with misused methods and functions

### Phase 5: Debugging Mode
- [ ] Create new questions table in database for Debugging questions (Mimics Speaking Questions)
- [ ] Candidate is given prewritten code that needs to be debugged
- [ ] Questions increase in difficulty, starting with minor syntax and format errors, ending with misused methods and functions

### Phase 6: Solo Mode
- [ ] Create new questions table in database for Solo questions (Mimics Speaking Questions)
- [ ] Multiple choice questions
- [ ] Questions increase in difficulty, starting with minor syntax and format errors, ending with misused methods and functions
- [ ] Whiteboard questions that will show answer after time is up
