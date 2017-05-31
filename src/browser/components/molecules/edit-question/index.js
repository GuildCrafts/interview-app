import React, {Component} from 'react'
import Form from '../../molecules/form/index'
import Request from '../../common/requests'

export default class EditQuestion extends Component {
  constructor(){
    super()
    this.state = {}
  }

  // NEEDS WORK!
  submitQuestionEdits(formData) {
    Request.put('/api/questions/approval' + "/" + formData.id, formData)
  }

  render(){
    console.log(this.props)
    return(
      <div id="edit-question-modal" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body">
          <h2 className="uk-modal-title uk-text-center">Edit Question</h2>
          <Form inputModules={this.props.inputModules}
                initialValue={this.props.initialValue}
                onSubmit={this.submitQuestionEdits.bind(this)}
                key='EditQuestionForm'/>
        </div>
      </div>
    )
  }
}
