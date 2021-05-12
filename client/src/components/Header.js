import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google" className="inline-block px-6 py-3 leading-none border
              rounded text-black hover:text-white hover:bg-black text-base"
            >
              Login with Google
            </a>
          </li>
        );
      default:
        return [
          <li key="1" className="mr-3"><Payments /></li>,
          <li key="2" className="mr-3 px-4 py-3">
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3"><a href="/api/logout" className="inline-block px-6 py-3 leading-none border
              rounded text-black hover:text-white hover:bg-black text-base"
          >
            Logout
          </a></li>
        ];
    }
  }

  render() {
    return (
      <nav className="flex items-center justify-between flex-wrap p-6 mb-12">
        <Link
          to={this.props.auth ? '/surveys' : '/'}
          className="flex item-center text-2xl"
        >
          <span className="material-icons-outlined text-2xl mr-1">
            email
          </span>
          <span className="font-bold">Emaily</span>
        </Link>
        <ul className="flex items-center">
          {this.renderContent()}
        </ul>
      </nav>
    );
  };
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);