import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  render () {
    return (
      <div className={classes.ContactData}>
        <h4>Enter Contact Info</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Joe Schmoe" />
          <input className={classes.Input} type="text" name="email" placeholder="joeschmoe@email.com" />
          <input className={classes.Input} type="text" name="street" placeholder="123 Fake St." />
          <input className={classes.Input} type="text" name="postal" placeholder="90210" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;