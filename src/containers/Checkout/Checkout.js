import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/Checkout Summary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      bacon: 1,
      meat: 1,
      lettuce: 1,
      cheese: 1
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      console.log(param);
      // each param is like ["bacon", "0"] etc.
      ingredients[param[0]] = +param[1];
      // ingredients['bacon'] = 0 etc.
    }
    this.setState({ingredients: ingredients})
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}/>
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
      </div>
    )
  }
}

export default Checkout;