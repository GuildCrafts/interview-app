import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

global.document = jsdom('');
global.window = document.defaultView;
global.fetch = () => Promise.resolve({json: () => JSON.stringify([])})

import Game from '../../../src/browser/components/pages/game/index'
import Scorecard from '../../../src/browser/components/molecules/scorecard/index'

describe('<Game />', () => {
  const topics = ['http', 'core-sql'];
  context('testing game buttons that get rendered below', () => {
    context('buttons should render if game page is receiving data from db', () => {
      it('should render 4 buttons on the page', () => {
        const wrapper = mount(<Game content={{}} skipped={[5]} questions={[9]} topics={topics} />)
        expect(wrapper.find('button').length).to.be.eql(4);
      })
    })
    context('buttons wont render if game page receives no data', () => {
      it('should not render the "correct" button', () => {
        const wrapper = mount(<Game content={{}} skipped={[]} questions={[]} topics={topics} />)
        expect(wrapper.find('#correct').exists()).to.be.false
      })
      it('should not render the "skipped" button', () => {
        const wrapper = mount(<Game content={{}} skipped={[]} questions={[]} topics={topics} />)
        expect(wrapper.find('#skipped').exists()).to.be.false
      })
      it('should not render the "Show Answer" button', () => {
        const wrapper = mount(<Game content={{}} skipped={[]} questions={[]} topics={topics} />)
        expect(wrapper.find('#show').exists()).to.be.false
      })
    })
  })
  context('elements rendered', () => {
    it('should render the <Scorecard /> component first', () => {
      const wrapper = shallow(<Game content={{}} skipped={[]} questions={[]} topics={topics} />)
      expect(wrapper.childAt(0).matchesElement(<Scorecard />)).to.be.true
    })
    it('should render the progress bar second', () => {
      const wrapper = shallow(<Game content={{}} skipped={[]} questions={[]} topics={topics} />)
      expect(wrapper.childAt(1).matchesElement(<progress />)).to.be.true
    })
    it('should render a text area for interview notes', () => {
      const wrapper = mount(<Game content={{}} skipped={[]} questions={[]} topics={topics} />)
      expect(wrapper.find('textarea').exists()).to.be.true
      expect(wrapper.find('textarea').parent().is('div.uk-container-center')).to.be.true
    })
    it('should render Hint button', () => {
      const wrapper = shallow(<Game content={{}} skipped={[]} questions={[]}/>)
      expect(wrapper.find('button.uk-button').exists()).to.be.true
    })
  })
})
