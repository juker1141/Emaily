import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkoutSuccess } from '../../actions';

class PaymentsAdd extends React.Component {
  componentDidMount() {
    this.props.checkoutSuccess(this.props.history);
  }

  render() {
    return null;
  }
}

export default connect(null, { checkoutSuccess })(withRouter(PaymentsAdd));