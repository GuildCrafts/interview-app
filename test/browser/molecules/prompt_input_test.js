import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

global.document = jsdom('');
global.window = document.defaultView;

import AddInput from '../../../src/browser/components/molecules/prompt-input/index'

describe('<AddInput />', () => {
  it('should render a div', () => {
    const wrapper = shallow(<AddInput />)
    expect(wrapper.find('div.add-input')).to.have.length(1)
  })

  context('the first element should be a button', () => {
    it('should be a button', () => {
      const wrapper = shallow(<AddInput />)
      expect(wrapper.find('div.add-input button').length).to.equal(1)
    })
  })


})
