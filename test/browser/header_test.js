import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { jsdom } from 'jsdom'

import Header from '../../src/browser/components/molecules/header/index'
import StatBox from '../../src/browser/components/atoms/stat-box/index'
import ProfileBox from '../../src/browser/components/atoms/profile-box/index'

global.document = jsdom('');
global.window = document.defaultView;

describe('<Header />', () => {
  it('renders the navbar containing relevant user information', () => {
    let stats = {
      Experience:1,
      PriorityLevel:2,
      Difficulty:3
    }
    const fakeStats = {
      experience: {value: 100, heading: "Experience"},
      difficulty: {value: "Beginner", heading: "Difficulty"}
    }
    const fakeProfile = {
      profileName: {value: "Murphy"},
      topic: {value: "JavaScript"},
      gameMode: {value: "Speaking"}
    }
    const wrapper = mount(<Header stats={fakeStats} profile={fakeProfile} />)
    expect(wrapper.props().stats.experience.value).to.equal(100)
    expect(wrapper.props().stats.experience.value).to.be.a('number')
    expect(wrapper.props().profile.profileName.value).to.equal("Murphy")
    expect(wrapper.props().profile.profileName.value).to.be.a('string')
    expect(wrapper.find(ProfileBox).length).to.equal(3)
    expect(wrapper.find(StatBox).length).to.equal(2)
  })
})
