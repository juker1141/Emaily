import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

const PaymentsCancel = () => {
  const actionsButtons = (mainColor) => {
    return (
      <React.Fragment>
        <Link
          to="/surveys"
          className={`bg-${mainColor}-400 text-white px-6 py-2 font-bold rounded
              hover:bg-${mainColor}-600 focus:outline-none focus:ring
              hover:shadow-none transition-all duration-300
              flex items-center`}
        >
          Get Back
          <span className="material-icons ml-2">
            home
          </span>
        </Link>
      </React.Fragment>
    )
  };

  return (
    <div>
      <Modal
        icon="priority_high"
        colorStatus="warning"
        actions={actionsButtons('yellow')}
      >
        <div className="text-xl font-black mb-5">OOPS !</div>
        <div className="mb-3 font-bold">Payments is Cancel</div>
        <div>Maybe you want to chew it over</div>
      </Modal>
    </div>
  );
}

export default PaymentsCancel;