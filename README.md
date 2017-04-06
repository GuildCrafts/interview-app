# Interview App

### Description
Build an app that will tests learner's knowledge of programming by creating an interactive mock interview between two players.

Build the data model and database that will include multiple game modes. It is recommended that you use a relational, open-source data store like PostgreSQL.

When complete, you’ll have an API for working with multiple game modes with database persistence.

The Solo Mode will be linked to the	[matrix](http://matrix.apps.learnersguild.org/), where individuals can self assess if they are competent in each section, before checking it off.

### Context
Practicing mock interviews helps the Candidate develop skills for answering technical question during the interview process while lowering testing anxiety. It also helps the Interviewer gain perspective on desired qualities in candidates.

## Specifications
Specifications and requirements will be assigned based on the items in backlog within the Development project (see the projects tab of the interview-app repository).

### Setup instructions
 Install all dependencies by running this in a terminal window
```bash
    npm install
```

### Start development server
Run this in a terminal window
```bash
    npm run start:dev
```

### Guide to contributing questions
- Fork the repo
- Add the questions to the file `data/questions.json`. Make sure the questions are tagged with the appropriate `tags`, and `level`.
- Create a Pull Request from your forked repo against the master branch of this repo.

