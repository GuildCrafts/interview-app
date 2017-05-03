import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

global.document = jsdom('');
global.window = document.defaultView;

import StatCounter from '../../../src/browser/components/atoms/stat-counter/index'

describe('<StatCounter />', () => {
  it('should contain a div', () => {
    const wrapper = shallow(<StatCounter />)
    expect(wrapper.find('div.uk-margin-small-left')).to.have.length(1)
  })

  it('should contain a nested div', () => {
    const wrapper = mount(<StatCounter />)
    expect(wrapper.find('div.uk-badge').exists()).to.be.true
  })
})
