import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        // console.log(res.data);
        const fetchedOrders = [];

        for (let orderId in res.data) {
          fetchedOrders.push({
            ...res.data[orderId],
            id: orderId
          });
        }
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render () {
    return (
      <div>
        <Order/>
        <Order/>
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);