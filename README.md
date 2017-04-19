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
If this is the first time you're setting up the Interview-App repo:

1. Enter these commands in the interview-app directory (this will clone the IDM repo):
  - `./go init`
  - `./go install_idm`
<br></br>  
2. Create a `.env.development` file in the IDM repo and follow steps 7 & 8 in the IDM `README`.

3. Create a `.env.development` file in the Interview-App repo and add only the `JWT_PUBLIC_KEY` from the IDM repo. Example (This should all be one single line with `/n` as line breaks):
   - `JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMEOWMEOWMEOWMEOWIjANBgkqhkiG9w0BAQ3FAAOCAQ8AMIIBCgKCAQEAvr1sxNbmbBwWlT101LWj\ngYp9csutmPKX6yi0DOojeg2RDaRwkr5UOd4pbr6/5Plgvx12hXxWGN54ZG4Aaz1y\nZmDs6DFyeWNtzcVdjhOuoG8PzF/kt613JJClkZ/k827bW7go4TGL3cRg9E8Rdcc7\nhKmWo2nPNSV6EiQreGzvlPCqbpVyqvKOrtDXVSn73HxGlrBLbZXq6YPNfrvgKOCm\nyMNsnfYS6nLTJ+YERNzZuZOX2steqsyFuN5cygvme5AMxjo3fi5tBN5IkFwYWFh1\nOGqEE3w+WOlN1spS/6d9EADOzCbRWx7rUaiRrdLDKhBldmoqdUhCjw8f8vAntEWh\nGwIDAQAB\n-----END PUBLIC KEY-----"`
<br></br>
4. Make sure your IDM repo is on the same level as your Interview-App repo (but not within the Inverview-App repo)

5. In interview-app terminal:
  - `./go install_idm` (this completes steps 9-16 within the IDM `README` file)
<br></br>
6. If node environment error appears, please do the following:
    - Open a new terminal window and navigate to the IDM folder

    - In IDM terminal:
        - `cat ~/.npmrc`
        <br></br>  
    - Copy the token that follows `//registry.npmjs.org/:_authToken=`

    - In IDM terminal (open with your text editor of choice):
        - `atom ~/.zshrc`

        or, if you're using bash:
        - `atom ~/.bashrc`
        <br></br>  
    - At the bottom of the file, add:
        - `export NPM_AUTH_TOKEN=--paste token--`

        - `export NODE_ENV=development`
    - In IDM terminal:
        - `source ~/.zshrc`

        or, if you're using bash:
        - `source ~/.bashrc`
        <br></br>  
7. Follow steps 17-19 in the IDM `README` file
<br></br>  

If you've worked on this repo in the past, and you're working in the development environment:
  - ./go start

To run your test and reset the test database:
  - ./go test

To reset the database and run the migration:
  - ./go reset_db

For additional help and usage instructions:
  - ./go help

### Start development server
Run this in a terminal window
```bash
    npm run start:dev
```

### Guide to contributing questions
- Fork the repo
- Add the questions to the file `data/questions.json`. Make sure the questions are tagged with the appropriate `topics`, and `level`.
- Create a Pull Request from your forked repo against the master branch of this repo.
