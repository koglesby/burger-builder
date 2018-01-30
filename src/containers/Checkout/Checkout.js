import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/Checkout Summary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      bacon: 1,
      meat: 1,
      lettuce: 1,
      cheese: 1
    }
  };

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}/>
      </div>
    )
  }
}

export default Checkout;