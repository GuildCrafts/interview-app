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
    "type"       : "TextArea",
    "placeholder": "Enter your question",
    "label"     : "Question",
    "tag"        : "question"
  },
  {
    "type"       : "TextArea",
    "placeholder": "Answer it thoroughly",
    "label"     : "Answer",
    "tag"        : "answer"
  },
  // {
  //   "type"            : "Select",
  //   "showPrompt"      : true,
  //   "label"          : "Game Mode",
  //   "options"         : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
  //   "tag"             : "game_mode",
  //   "isOptionRequired": true
  // },
  {
    "type"   : "Checkbox",
    "options": [],
    "label" : "Topics",
    "tag"    : "topics"
  },
  {
    "type"   : "Radio",
    "options": ["beginner", "intermediate", "advanced", "jedi"],
    "label" : "Difficulty Level",
    "tag"    : "level"
  },
  {
    "type"            : "Hint",
    "label"          : "Hints",
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
    this.successNotification = this.successNotification.bind(this)
  }

  componentDidMount(){
    Requests.get('/api/topics/')
    .then(response => {
      let currentState = this.state
      currentState.form[2].options = response.topics
      this.setState(currentState)
    })
  }

  handleSubmit(formData) {
    event.preventDefault()
    Requests.post('/api/questions/', formData)
    .then( response =>
      response.json()
    ).then(body => {
      if(body.error) {
        this.successNotification(body.error + ' ' + body.errorMsg, 'error')
      } else {
        this.successNotification('Created the question successfully.')
      }
    })
  }

  successNotification(message, level='success') {
    this.props.addNotification(message, level)
  }

  render() {
    return (
      <div id="new-question-modal" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body">
          <h2 className="uk-modal-title uk-text-center">New Question</h2>
            <p>When writing your question, please make sure that it is clearly stated, and that the answer is not ambigious. The more accurate the answer, the better learning experience. If you are unsure if your question (or one that is similar) has already been submitted, please checkout the approval page to browse all questions. Thanks for contributing!</p>
          <Form inputModules={this.state.form}
                onSubmit={this.handleSubmit.bind(this)}
                key='NewQuestionForm' />
        </div>
      </div>
    )
  }
}
