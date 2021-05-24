import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

class PaymentsSuccess extends React.Component {
  actionsButtons(mainColor) {
    return (
      <React.Fragment>
        <Link
          to="/surveys/new"
          className={`bg-${mainColor}-500 text-white px-6 py-2 font-bold rounded
              hover:bg-${mainColor}-700 focus:outline-none focus:ring
              hover:shadow-none transition-all duration-300
              flex items-center`}
        >
          Send Email
          <span className="material-icons ml-2">
            email
          </span>
        </Link>
      </React.Fragment>
    )
  };

  render() {
    return (
      <div>
        <Modal
          icon="done"
          mainColor="green-500"
          actions={this.actionsButtons('green')}
        >
          <div className="text-xl font-black mb-5">Payments is Success</div>
          <div className="mb-3">Your credits is success be adding</div>
          <div className="font-bold">Try to send your first email</div>
        </Modal>
      </div>
    );
  };
};

export default PaymentsSuccess;