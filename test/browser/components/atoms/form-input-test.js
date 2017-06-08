import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

import FormInput from '../../../src/browser/components/atoms/form-input/index'

describe('<FormInput />', () => {

  it('should return a div', () => {
    const wrapper = shallow(<FormInput />)
    expect(wrapper.find('div.uk-form-controls')).to.have.length(1)
  })

  it('should have an input field inside the main div', () => {
    const wrapper = mount(<FormInput />)
    expect(wrapper.find('input.form-horizontal-text')).to.have.length(1)
  })
})
