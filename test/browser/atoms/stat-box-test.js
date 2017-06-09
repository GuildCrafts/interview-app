import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

global.document = jsdom('');
global.window = document.defaultView;

import StatBox from '../../../src/browser/components/atoms/stat-box/index'
import StatCounter from '../../../src/browser/components/atoms/stat-counter/index'

describe('<StatBox />', () => {

  it('should return a div', () => {
    const wrapper = shallow(<StatBox />)
    expect(wrapper.find('div.uk-grid-small')).to.have.length(1)
  })

  context('should have a nested div', () => {
    it('should have a div inside of the main div', () => {
      const wrapper = mount(<StatBox />)
      expect(wrapper.find('div.uk-grid-small').childAt(0).type()).to.equal('div')
      expect(wrapper.find('div.uk-flex-left')).to.have.length(1)
    })
  })
  context('inner div contains an instance of <StatCounter />', () => {
    it('should render <StatCounter/>', () => {
      const wrapper = mount(<StatBox />)
      expect(wrapper.containsMatchingElement(<StatCounter />)).to.be.true
    })
  })

})
