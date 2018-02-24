import { BurgerBuilder } from './BurgerBuilder';
import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={ () => {} } />)
  });

  it('should render BuilControls when receiving ingredients', () => {
    wrapper.setProps({ings: {lettuce: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })
});

