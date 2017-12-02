import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxil';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 2,
      bacon: 0,
      cheese: 4,
      meat: 0
    }
  };
  render () {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls/>
      </Aux>
    );
  }
}

export default BurgerBuilder;