import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

import ProfileBox from '../../../src/browser/components/atoms/profile-box/index'

describe('<ProfileBox />', () => {

  it('should return a div', () => {
    const wrapper = shallow(<ProfileBox />)
    expect(wrapper.children()).to.have.length(1)
  })

  it('the child element should be a div', () => {
    const wrapper = mount(<ProfileBox />)
    expect(wrapper.find('div.uk-grid-small').childAt(0).type()).to.equal('div')
  })



});
