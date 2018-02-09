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

const INGREDIENT_PRICES = {
  lettuce: 0.25,
  bacon: 1,
  cheese: .5,
  meat: .75
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
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

      };
    default:
      return state;
  }

};

export default reducer;