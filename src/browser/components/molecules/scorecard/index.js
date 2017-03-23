import React, {Component} from 'react';

export default class Scorecard extends Component {
  render() {
    const {questions, answered, skipped} = this.props
    return (
      <div className="uk-grid">

          <div className="">Correct: {answered.length}/{questions.length}</div>
          <div className="">Skipped: {skipped.length}/{questions.length}</div>

      </div>
    )
  }
}
