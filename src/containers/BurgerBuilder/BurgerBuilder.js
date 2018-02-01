import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxil';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  lettuce: 0.25,
  bacon: 1,
  cheese: .5,
  meat: .75
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    ordering: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    console.log(this.props);
    axios.get('https://koglesby-react-burger-builder.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error: true})
      })
  }

  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchasable(updatedIngredients);
  };

  orderHandler = () => {
    this.setState({ordering: true})
  };

  orderCancelHandler = () => {
    this.setState({ordering: false});
  };

  orderContinueHandler = () => {

    const queryParams = [];
    for (let ing in this.state.ingredients) {
      queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]))
    }

    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render () {
    //copy the ingredients state
    const disabledInfo = {
      ...this.state.ingredients
    };
    // changes the number value on the right to true or false based on if it is 0 or less
    for (let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // ex: {lettuce: true, bacon: false, etc...}

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    let burger = this.state.error ? <p>Ingredients cannot be loaded</p>:<Spinner/>;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.orderHandler}/>
        </Aux>
      );
      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        orderCancelled={this.orderCancelHandler}
        orderContinued={this.orderContinueHandler}/>;
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>;
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

export default withErrorHandler(BurgerBuilder, axios);