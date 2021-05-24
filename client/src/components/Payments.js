import React from 'react';
import { connect } from 'react-redux';
import { addCredits } from '../actions';


const CheckoutScreen = (props) => {
  return (
    <div>
      <button
        onClick={() => { props.addCredits(1) }}
        className="inline-block px-6 py-3 leading-none border
        font-extrabold bg-black rounded text-white hover:bg-gray-700 text-base"
      >
        Add Credits
      </button>
    </div>
  );
};

export default connect(null, { addCredits })(CheckoutScreen);