import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import GameOptions from '../../src/browser/components/molecules/game-options/index.js'

describe('<GameOptions />', () => {
  it('renders the first view with headers bar', () => {
    const wrapper = shallow(<GameOptions />)
    expect(wrapper.find('.uk-form-horizontal'))
  })
})
