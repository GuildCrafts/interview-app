import React, {Component} from 'react'
import flex from 'react-uikit-flex'

import ProfileBox from '../../atoms/profile-box/index'
import StatBox from '../../atoms/stat-box/index'
import AddInput from '../prompt-input/index'
import Form from '../../molecules/form/index'
import Requests from '../../common/requests'
import inputModules from '../../common/question-form-template'

require('../../../../../public/stylesheets/uikit.min.css')


export default class NewQuestion extends Component {
  constructor() {
    super()
    this.state = {
      form: inputModules,
    }
  }

  submitQuestion(formData, event) {
    console.log('formData::', formData);
    event.preventDefault()
    Requests.post('api/questions', formData)
    .then( response => response.json() )
    .then( question => console.log('question', question) )
  }

  render() {

    return (
      <div id="modal-example" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body">
          <h2 className="uk-modal-title uk-text-center">New Question Form</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <Form inputModules={inputModules} onSubmitHandler={this.submitQuestion} />
        </div>
      </div>
    )
  }
}
