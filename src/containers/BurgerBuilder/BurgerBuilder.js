import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxil';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    ordering: false
  };

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  orderHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ordering: true})
    } else {
      this.props.onSetAuthRedirect('/checkout');
      this.props.history.push('/auth');
    }
  };

  orderCancelHandler = () => {
    this.setState({ordering: false});
  };

  orderContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render () {
    //copy the ingredients state
    const disabledInfo = {
      ...this.props.ings
    };
    // changes the number value on the right to true or false based on if it is 0 or less
    for (let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // ex: {lettuce: true, bacon: false, etc...}

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients cannot be loaded</p>:<Spinner/>;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchasable(this.props.ings)}
            price={this.props.price}
            ordered={this.orderHandler}
            isAuth={this.props.isAuthenticated}/>
        </Aux>
      );
      orderSummary = <OrderSummary
        price={this.props.price}
        ingredients={this.props.ings}
        orderCancelled={this.orderCancelHandler}
        orderContinued={this.orderContinueHandler}/>;
    }

    return (
      <Aux>
        <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));