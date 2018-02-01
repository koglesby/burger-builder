import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  console.log(props);
  // console.log('object keys' + Object.keys(props.ingredients));
  let transformedIngredients = Object.keys(props.ingredients)
  // starts as an array of the keys of props.ingredients ( [lettuce, bacon, cheese, meat] )
    .map(igKey => {
      // for each element(in the outer array), return an array of jsx elements,
      // each with a unique key (ingredient + index), and the type of the ingredient
      return [...new Array(props.ingredients[igKey])].map((_, i) => {
        console.log(igKey + ' i = ' + i);
        return <BurgerIngredient key={igKey + i} type={igKey}/>;
      });
    })
    // flatten out the array of arrays, leaving a main array of jsx elements
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  // console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;