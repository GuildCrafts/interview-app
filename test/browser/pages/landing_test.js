import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

global.document = jsdom('')
global.window = document.defaultView

import Landing from '../../../src/browser/components/pages/landing/index'
import Layout from '../../../src/browser/components/pages/layout/index'
import GameOptions from '../../../src/browser/components/molecules/game-options/index'
import Game from '../../../src/browser/components/pages/game/index'
import Header from '../../../src/browser/components/molecules/header/index'
import Routes from '../../../src/browser/components/common/router'

describe('<Landing />', () => {
  const kwery = { location: {
    search: 'localhost:3000/?topic=JavaScript&difficulty=beginner'}
  }
  it('should render the layout component', () => {
    const wrapper = shallow(<Landing profile={{}} stats={{}} location={{}} />)
    expect(wrapper.contains(<Landing />)).to.equal.true
  })
  // it('should parse a query string if it exists', () => {
  //   const wrapper = shallow(<Landing profile={{}} stats={{}} location={kwery} />)
  //   console.log('location prop ::', wrapper.props('location'))
  //   // expect(wrapper.prop('location')).
  // })
})
