import React from 'react'
import { expect } from 'chai'
import chai from 'chai'
import { chaiEnzyme }  from 'chai-enzyme'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'



import Scorecard from '../../../src/browser/components/molecules/scorecard/index'
import Header from '../../../src/browser/components/molecules/header/index'
import StatBox from '../../../src/browser/components/atoms/stat-box/index'
import ProfileBox from '../../../src/browser/components/atoms/profile-box/index'
import Landing from '../../../src/browser/components/pages/landing/index'

global.document = jsdom('');
global.window = document.defaultView;


describe('<Scorecard />', () => {
  const answered = 10
  const questions = 30
  const skipped = 2

  it('should render a div', () => {
    const wrapper = shallow(<Scorecard questions={[]} answered={[]} skipped={[]}/>)
    expect(wrapper.find('div.uk-grid')).to.have.length(1)
  })

  it('should have two nested divs', () => {
    const wrapper = mount(<Scorecard questions={[]} answered={[]} skipped={[]}/>)
    expect(wrapper.children()).to.have.length(2)
  })

  it('has three props', () =>{
    const wrapper = mount(<Scorecard questions={questions} answered={answered} skipped={skipped}/>)
    expect(wrapper.prop('questions')).to.equal(30)
    expect(wrapper.prop('answered')).to.equal(10)
    expect(wrapper.prop('skipped')).to.equal(2)

  })


})
