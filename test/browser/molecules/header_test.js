import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import { jsdom } from 'jsdom'

import Header from '../../../src/browser/components/molecules/header/index'
import StatBox from '../../../src/browser/components/atoms/stat-box/index'
import ProfileBox from '../../../src/browser/components/atoms/profile-box/index'

global.document = jsdom('');
global.window = document.defaultView;

describe.only('<Header />', () => {
  const fakeStats = {
    experience: {value: 100, heading: "Experience"},
    difficulty: {value: "Beginner", heading: "Difficulty"}
  }
  const fakeProfile = {
    profileName: {value: "Murphy"},
    topic: {value: "JavaScript"},
    gameMode: {value: "Speaking"}
  }
  it('renders the navbar containing relevant user information', () => {
    let stats = {
      Experience: 1,
      Difficulty: "Beginner"
    }
    const wrapper = mount(<Header stats={fakeStats} profile={fakeProfile} />)
    expect(wrapper.props().stats.experience.value).to.equal(100)
    expect(wrapper.props().stats.experience.value).to.be.a('number')
    expect(wrapper.props().profile.profileName.value).to.equal("Murphy")
    expect(wrapper.props().profile.profileName.value).to.be.a('string')
    expect(wrapper.find(ProfileBox).length).to.equal(3)
    expect(wrapper.find(StatBox).length).to.equal(2)
  })

  it('menu button exists', () => {
    const menu = shallow(<Header stats={fakeStats} profile={fakeProfile} />)
    expect(menu.find('#menu')).to.exist
    const navBefore = menu.find('#offcanvas-nav-primary')
    console.log('menu before===========', menu.find('#offcanvas-nav-primary'))
    menu.find('#menu').simulate('click')

    console.log('menu after===========', menu.find('#offcanvas-nav-primary'))

    expect(menu.find('#offcanvas-nav-primary.uk-open')).to.exist
  })
})
