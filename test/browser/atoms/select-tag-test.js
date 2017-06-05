import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { jsdom } from 'jsdom'

import SelectTag from '../../../src/browser/components/atoms/form-select/index'


describe('<SelectTag />', () => {
  const label = 'difficulty'
  const options = ['Javascript', 'SQL', 'http']
  const value = 'SQL'

  it('should return a div', () => {
    const wrapper = shallow(<SelectTag options={[]} label={label} value={options[1]}  />)
    expect(wrapper.find('div.uk-margin')).to.have.length(1)
  })

  context('the outer div should contain two html elements', () => {
    it('should have a label', () => {
      const wrapper = mount(<SelectTag options={[]} label={label} value={options[1]} />)
      expect(wrapper.find('div.uk-margin').childAt(0).type()).to.equal('label')
      expect(wrapper.props().label).to.equal('difficulty')
    })

    it('should have a div', () => {
      const wrapper = mount(<SelectTag options={[]} label={label} value={options[1]} />)
      expect(wrapper.find('div.uk-margin').childAt(1).type()).to.equal('div')
    })
  })

  context('inner divs child should be a select', () => {
    it('is a selector', () => {
      const wrapper = mount(<SelectTag options={[]} label={label} value={options[1]} />)
      expect(wrapper.find('div.uk-form-controls').children().type()).to.equal('select')
    })
    it('should display a value', () => {
      const wrapper = mount(<SelectTag options={[]} label={label} value={options[1]} />)
      expect(wrapper.props().value).to.equal('SQL')
    })
  })

  it('should render N+1 <option> tags', () => {
    const wrapper = mount(<SelectTag options={options} label={label} />)
    expect(wrapper.find('option').length).to.eql(3)
  })

})
