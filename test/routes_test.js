import React from 'react'
import { Route } from 'react-router'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>')
global.document = doc
global.window = doc.defaultView

import Routes from '../src/browser/components/common/router'
import Landing from '../src/browser/components/pages/landing/index'
import Scorecard from '../src/browser/components/molecules/scorecard/index'
import FormSelect from '../src/browser/components/atoms/form-select/index'
import GameOptions from '../src/browser/components/molecules/game-options/index'

describe('<Routes />', () => {
  it('should render correct routes', () => {
    const wrapper = shallow( < Routes / > )
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props()
      pathMap[routeProps.path] = routeProps.component
      // console.log('path map::', pathMap)
      return pathMap;
    }, {})
    expect(pathMap['/'].toString()).to.equal(Landing.toString())
    console.log('the function for the landing component', pathMap['/'].toString())
  })
})
