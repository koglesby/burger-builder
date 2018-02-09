import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      // const oldCount = this.state.ingredients[type];
      // const updatedCount = oldCount + 1;
      // const updatedIngredients = {...this.state.ingredients};
      // updatedIngredients[type] = updatedCount;
      // const priceAddition = INGREDIENT_PRICES[type];
      // const newPrice = this.state.totalPrice + priceAddition;

      return {
      //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      // this.updatePurchasable(updatedIngredients);
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      };
    default:
      return state;
  }

};

export default reducer;