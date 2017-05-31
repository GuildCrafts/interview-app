import React, {Component} from 'react'
import flex from 'react-uikit-flex'

// import questions from '../../../../../data/questions.json'
import FormSelect from '../../atoms/form-select/index'
import Request from '../../common/requests'
import Form from '../../molecules/form/index'
import EditQuestion from '../../molecules/edit-question/index'
import Layout from '../layout/index'

require('../../../../../public/stylesheets/uikit.min.css')

const inputModules = [
  {
    "type"       : "TextArea",
    "placeholder": "Enter your question",
    "label"     : "Question",
    "tag"        : "question",
    "value"      : ""
  }
  ,
  {
    "type"       : "TextArea",
    "placeholder": "Answer it thoroughly",
    "label"     : "Answer",
    "tag"        : "answer",
    "value"      : ""
  },
  {
    "type"            : "Select",
    "label"          : "Game Mode",
    "options"         : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"             : "game_mode",
    "isOptionRequired": true,
    "chooseSelect"    : ""
  },
  {
    "type"   : "Checkbox",
    "options": [],
    "label" : "Topics",
    "tag"    : "topics",
    "checked": []
  },
  {
    "type"   : "Radio",
    "options": ["Beginner", "Intermediate", "Advanced", "Jedi"],
    "label" : "Difficulty Level",
    "tag"    : "level",
    "checked": ""
  },
  {
    "type"            : "Hint",
    "label"          : "Hints",
    "tag"             : "hints",
    "placeholder"     : "Write a helpfull hint"
  }
]


export default class ApprovalPage extends Component {
  constructor(props) {
    super(props)
    this.inputModules = inputModules
    this.inputModules[3].options = this.props.topics
    this.state = {questions: [], id: 0, filter: "All", triggerState: true, currentQuestion: null, inputModules: this.inputModules}
  }

  componentDidMount(){
    Request.get('/api/questions/approval').then(questions => {
      this.setState(Object.assign(this.state, {questions: questions}))
    })
    
  }

  onClickDelete(index){
    const deleteConfirm = confirm("Are you sure you want to delete this question?")
    if (deleteConfirm) {
      let questArr = this.state.questions
      questArr.splice(this.refs[index], 1)
      this.setState({questions: questArr})
      Request.deleteQuestion('/api/questions/approval/:id').then(question => {
        return question
      })
    }
  }

  setCurrentQuestion(index){
    this.setState({currentQuestion: this.state.questions[index]})
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
            <div key={`question-${index}`}>
              <div>
                <button className="uk-button-small uk-button-danger" onClick={this.onClickDelete.bind(this, index)} ref={index} type="button" >Delete this question</button>
                <button ref={index} className="uk-button uk-button-default uk-margin-small-right" type="button" onClick={this.setCurrentQuestion.bind(this, index)} data-uk-toggle="target: #edit-question-modal" >{question.question}</button>
              </div>
            </div>
          )
        }
      })
    )
  }

  render() {
    console.log('approval page props.topics',this.props.topics)
    const filterArray = ['All', 'Approved', 'Pending']
    let content = this.renderQuestions()
    return (
      <div className="uk-container" >
        <Layout profile={this.props.profile} stats={this.props.stats}>
          Click to edit the following questions:
          <br></br>
          <FormSelect options={filterArray} label='Filter' onChange={this.handleChange.bind(this, 'filter')}/>
          <br></br>
          {content}
          <EditQuestion inputModules={this.state.inputModules} initialValue={this.state.currentQuestion} />
        </Layout>
      </div>
    )
  }
}

// When individual question is clicked, modal opens
// When modal opens, question properties populate (read)
// When edit button is selected, question form becomes editable (update)
