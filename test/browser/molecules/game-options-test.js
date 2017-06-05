import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

import GameOptions from '../../../src/browser/components/molecules/game-options/index.js'
import SelectTag from '../../../src/browser/components/atoms/form-select/index'

global.document = jsdom('');
global.window = document.defaultView;

describe('<GameOptions />', () => {
  const topics = ["JavaScript", "http", "SQL"]
  const difficulty = ["beginner", "intermediate", "advanced"]
  const gameModes = ['solo', 'pair', 'whiteboard']

  //Note by Punit: Commenting until GameOptions component is stable

  // context('it should render a form', () => {
  //   it('has a form element', () => {
  //     const wrapper = mount(<GameOptions options={[]} parse ={[]} />)
  //     expect(wrapper.find('div').childAt(2).type()).to.equal('form')
  //   })
  //   it('contains a fieldset as its first child', () => {
  //     const wrapper = mount(<GameOptions options={[]} parse ={[]} />)
  //     expect(wrapper.find('form').childAt(0).type()).to.equal('fieldset')
  //   })

  // })
  // it('should render SelectTag in the right order with correct props', () => {
  //   const wrapper = mount(<GameOptions difficulty={difficulty} topics ={topics}
  //                         gameModes={gameModes} parse={{}} />)
  //   expect(wrapper.find(SelectTag).length).to.equal(3)
  //   expect(wrapper.find(SelectTag).get(0).props.options).to.equal(difficulty)
  //   expect(wrapper.find(SelectTag).get(1).props.options).to.equal(topics)
  //   expect(wrapper.find(SelectTag).get(2).props.options).to.equal(gameModes)
  // })
  // it('should render a button', () => {
  //   const wrapper = shallow(<GameOptions difficulty={difficulty} topics ={topics}
  //                         gameModes={gameModes} parse={{}} />)
  //   expect(wrapper.find('button.uk-button').exists()).to.be.true

  // })
})
