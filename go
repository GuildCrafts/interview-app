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
    NODE_ENV=test npm test
  }

  function init {
    echo "Initializing: add  initialization steps here"
    npm install
    reset_db development
    reset_db test
  }

  function start {
    npm run start:dev
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
    test) shift; test $@
    ;;
    start) start
    ;;
    *) help
  esac
