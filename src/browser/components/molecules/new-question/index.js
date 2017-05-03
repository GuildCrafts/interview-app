import React, {Component} from 'react'
import flex from 'react-uikit-flex'

import ProfileBox from '../../atoms/profile-box/index'
import StatBox from '../../atoms/stat-box/index'
import AddInput from '../prompt-input/index'
import Form from '../../molecules/form/index'
import Requests from '../../common/requests'

require('../../../../../public/stylesheets/uikit.min.css')

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
    "options": [],
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

export default class NewQuestion extends Component {
  constructor() {
    super()
    this.state = {
      form: inputModules
    }
  }

  componentDidMount(){
    Requests.get('/api/topics/')
    .then(response => {
      let currentState = this.state
      currentState.form[3].options = response
      this.setState(currentState)
    })
  }

  handleSubmit(formData) {
    // console.log(event);
    // event.preventDefault()
    console.log("New Q Form Data ====>", formData)
    Requests.post('/api/questions/', formData)
    .then( response => response.json() )
  }

  render() {

    return (
      <div id="modal-example" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body">
          <h2 className="uk-modal-title uk-text-center">New Question</h2>
            <p>When writing your question, please make sure that it is clearly stated, and that the answer is not ambigious. The more accurate the answer, the better learning experience. If you are unsure if your question (or one that is similar) has already been submitted, please checkout the approval page to browse all questions. Thanks for contributing!</p>
          <Form inputModules={this.state.form} onSubmit={this.handleSubmit.bind(this)} key='NewQuestionForm'/>
        </div>
      </div>
    )
  }
}
