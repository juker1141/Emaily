import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500} // 這裡的單位是美分 CENTs 所以 5美元 = 500美分
        token={(token) => this.props.handleToken(token)} // stripe 回傳的 function
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="inline-block px-6 py-3 leading-none border font-extrabold
          bg-black rounded text-white hover:bg-gray-700 text-base">Add Credits</button>
      </StripeCheckout>
    );
  };
};

export default connect(null, actions)(Payments);