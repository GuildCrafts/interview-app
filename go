#! /bin/bash

  function help {
    echo "Usage"
    echo "./go init ........................... Installs all dependencies and makes interview-app ready for development"
    echo "./go reset_db [development|test] .... Drops and creates database according to environment argument"
    echo "./go start .......................... Starts the server in dev mode"
    echo "./go test ........................... Runs reset_db test, then runs test scripts"
  }

  function reset_db {
    env=${1:-test}
    dbname=interviewdb-${env}
    dropdb ${dbname}
    createdb ${dbname}
    NODE_ENV=${env} npm run migrate
  }

  function test {
    reset_db test
    NODE_ENV=test PORT=3001 npm test
  }

  function init {
    echo "Initializing: add  initialization steps here"
    npm install
    reset_db development
    reset_db test
  }

  function start {
    npm run start:test
  }

  function add_env_var_to_shell {
    if [ $SHELL = "/bin/bash" ] ; then
      echo "${1}" >> ~/.bashrc
    elif [ $SHELL = "bin/zsh" ] ; then
      echo "${1}" >> ~/.zshrc
    fi
  }

  function source_shell_profile {
    if [ $SHELL = "/bin/bash" ] ; then
      source ~/.bashrc
    elif [ $SHELL = "bin/zsh" ] ; then
      source ~/.zshrc
    fi
  }

  function install_idm {
    PROJECT_HOME="${PWD}"
    IDM_HOME="${PWD}/../idm"
    if ! [ -d ${IDM_HOME} ]; then
        echo "cloning IDM github repo"
        git clone git@github.com:LearnersGuild/idm.git ${IDM_HOME}
    else
        echo "IDM github already exists. Skipping"
    fi

    if ! [ $NODE_ENV ]; then
        add_env_var_to_shell "export NODE_ENV=development"
    fi

    echo "installing rethinkdb.."
    brew install rethinkdb
    brew services start rethinkdb
    echo "...done installing rethinkdb"

    echo "installing redis..."
    brew install redis
    brew services start redis
    echo "...done installing redis"

    if ! [ -f "../idm/.env.development" ]; then
        echo "creating a .env.development file for idm"
        cp idm/.env.template ../idm/.env.development
    fi

    echo "Going to login to npmjs.org. "
    echo "If you dont remember the password, go to npmjs.org to reset password or create new account"
    if ! [ -f "${HOME}/.npmrc" ]; then
        npm login
    fi
    add_env_var_to_shell "export NPM_AUTH_TOKEN=$(cat ${HOME}/.npmrc | grep _authToken | cut -d '=' -f2)"
    source_shell_profile
    cd ${IDM_HOME}
    echo "installing npm packages"
    npm install
    echo "going to create db"
    npm run db:create
    echo "running migrations"
    npm run db:migrate -- up

    echo "Install Mehserve"
    npm install mehserve -g
    mkdir -p ~/.mehserve
    echo 9001 > ~/.mehserve/idm.learnersguild
    echo 3000 > ~/.mehserve/interview.learnersguild
    mehserve install
    echo "!!!! IMPORTANT !!!!"
    echo "paste the 5 commands above for successfull mehserve configuration"
  }

  if [ -z "${1}" ] ; then
    init
    echo "What up G"
    echo "Additional commands you can run --"
    help
    exit 0
  fi

  case $1 in
    init) init $@
    ;;
    reset_db) shift; reset_db $@
    ;;
    install_idm) shift; install_idm $@
    ;;
    test) shift; test $@
    ;;
    start) start
    ;;
    *) help
  esac
