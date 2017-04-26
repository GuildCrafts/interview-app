import React, {Component} from 'react';
import flex from 'react-uikit-flex'

// import questions from '../../../../../data/questions.json'
import FormSelect from '../../atoms/form-select/index'
import Request from '../../common/requests'
import Form from '../../molecules/form/index'
import Layout from '../layout/index'

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
    "options": ["Core-JavaScript","Functional-Programming"],
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

export default class ApprovalPage extends Component {
  constructor(props) {
    super(props)
    this.state = {questions: [], filter: "All"}
    this.populateForm = this.populateForm.bind(this)
  }

  componentDidMount(){
    console.log('THIS IS componentDidMount');
    Request.getDatabaseQuestions('/api/questions/approval').then(questions => {
      console.log('questions from API::', questions);
      this.setState(Object.assign(this.state, {questions: questions}))
    })
  }

  onClickDelete(index){
    let questArr = this.state.questions
    questArr.splice(this.refs[index], 1)
    this.setState({questions: questArr})
    Request.deleteQuestion('/api/questions/approval/:id').then(question => {
      return question
    })
  }

  populateForm(index) {
    // questions are already in the state of this component. This function needs to populate the form with the question that was clicked on.
    console.log('THIS IS THE QUESTION CLICKED', this.state.questions[index])
  }

  handleChange(property, event) {
    let targetValue = event.target.value
    if(targetValue === '') {
      targetValue = 'All'
    }
    this.setState({[property]: targetValue});
  }

  renderQuestions(){
    return (
      this.state.questions.map((question, index) => {
        let approvalState = this.state.filter
        if(approvalState === question.approval || approvalState === 'All') {
          return (
            <div>
              <div key = {index}>
                <button className="uk-button-small uk-button-danger" onClick={this.onClickDelete.bind(this, index)} ref={index} type="button" >Delete this question</button>
                <button ref={index} className="uk-button uk-button-default uk-margin-small-right" type="button" onClick={this.populateForm.bind(this, index)}>{question.question}</button>
              </div>
            </div>
          )
        }
      })
    )
  }
  render() {

    const filterArray = ['All', 'Approved', 'Pending']
    console.log('THIS.STATE.questions::', this.state.questions);
    let content = this.renderQuestions()
    return (
      <div className="uk-container" >
        <Layout profile={this.props.profile} stats={this.props.stats}>
            <div className="uk-grid-match uk-child-width-1-2 uk-padding" data-uk-grid>
              <div className="uk-card uk-card-default uk-card-body">
                Click to edit the following questions:
                <br></br>
                <FormSelect options={filterArray} label='Filter' onChange={this.handleChange.bind(this, 'filter')}/>
                <br></br>
                {content}
              </div>
              <br></br>
              <div className="uk-card uk-card-default uk-card-body">
                <Form inputModules={inputModules} onSubmitHandler={this.submitQuestion} />
              </div>
            </div>
        </Layout>
      </div>
    )
  }
}

// When individual question is clicked, modal opens
// When modal opens, question properties populate (read)
// When edit button is selected, question form becomes editable (update)
