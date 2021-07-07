import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCredits, toggleMenu } from '../actions';
import Payments from './Payments';

class Header extends React.Component {
  renderContent(status) {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        if (status === 'normal') {
          return (
            <li>
              <a
                href="/auth/google"
                className="inline-block px-6 py-3 leading-none text-primary
                  font-extrabold rounded text-base bg-green-400
                  hover:bg-green-500 focus:outline-none"
              >
                Login with Google
              </a>
            </li>
          );
        } else {
          return (
            <li className="flex justify-end px-16 py-3 w-full p-6">
              <a
                href="/auth/google"
                className="inline-block px-8 py-4 md:px-6 md:py-3 leading-none text-green-400
                  rounded-br-lg rounded-tl-lg font-extrabold text-base focus:outline-none
                  border-b-2 border-r-2 border-green-400 hover:bg-green-400 hover:text-secondary text-xl"
              >
                Login with Google
              </a>
            </li>
          );
        }
      default:
        if (status === 'normal') {
          return [
            <li key="1" className="mr-3">
              <Payments>
                <button
                  onClick={() => { this.props.addCredits(1) }}
                  className="inline-block px-6 py-3 leading-none text-primary
                    font-extrabold rounded text-base bg-green-400
                    hover:bg-green-500 focus:outline-none"
                >
                  Add Credits
                </button>
              </Payments>
            </li>,
            <li key="2" className="mr-3 px-4 py-3">
              Credits: {this.props.auth.credits}
            </li>,
            <li key="3">
              <a href="/api/logout" className="inline-block px-6 py-3 leading-none border
              rounded text-white text-base hover:bg-white hover:text-primary"
              >
                Logout
              </a>
            </li>
          ];
        } else {
          return [
            <li key="1" className="flex justify-end w-full text-xl px-16 mt-4 mb-3">
              Credits: {this.props.auth.credits}
            </li>,
            <li key="2" className="py-3 flex justify-end w-full px-16 mb-3">
              <Payments>
                <button
                  onClick={() => { this.props.addCredits(1) }}
                  className="inline-block px-8 py-4 md:px-6 md:py-3 leading-none text-green-400
                  rounded-br-lg rounded-tl-lg font-extrabold text-base focus:outline-none
                  border-b-2 border-r-2 border-green-400 hover:bg-green-400 hover:text-secondary text-xl"
                >
                  Add Credits
                </button>
              </Payments>
            </li>,
            <li key="3" className="flex justify-end w-full px-16 mb-3">
              <a
                href="/api/logout"
                className="inline-block px-8 py-4 md:px-6 md:py-3 leading-none border-b-2
                border-r-2 text-white text-base rounded-br-lg hover:bg-white
                hover:text-secondary rounded-tl-lg text-xl"
              >
                Logout
              </a>
            </li>
          ];
        }
    }
  }

  render() {
    return (
      <nav className="flex items-center justify-between flex-wrap py-4 lg:py-6 px-6 z-10 bg-primary fixed w-full container">
        <Link
          to={this.props.auth ? '/surveys' : '/'}
          className="flex items-center text-3xl lg:text-4xl"
        >
          <span className="mr-2">
            <i className="fas fa-paper-plane"></i>
          </span>
          <span className="font-FugazOne">Emaily</span>
        </Link>
        <div className="xl:block hidden">
          <ul className="items-center flex">
            {this.renderContent('normal')}
          </ul>
        </div>
        <button
          onClick={() => { this.props.toggleMenu(!this.props.showMenu) }}
          className="xl:hidden flex items-center h-12 w-12 focus:outline-none"
          type="button"
        >
          <span className="material-icons p-3">
            menu
          </span>
        </button>
        <div
          className={`fixed inset-y-0 md:w-1/2 w-full h-screen bg-secondary transition-all
          duration-500 flex justify-center z-20
          xl:hidden ${this.props.showMenu ? 'right-0' : '-right-full'}`}
        >
          <ul className="items-center flex flex-col md:w-3/4 w-full">
            <li className="flex md:justify-end justify-between items-center w-full py-4 lg:py-6 px-6">
              <Link
                to={this.props.auth ? '/surveys' : '/'}
                className="flex items-center text-3xl lg:text-4xl md:hidden"
              >
                <span className="mr-2">
                  <i className="fas fa-paper-plane"></i>
                </span>
                <span className="font-FugazOne">Emaily</span>
              </Link>
              <button
                onClick={() => { this.props.toggleMenu(!this.props.showMenu) }}
                className="xl:hidden flex items-center h-12 w-12 focus:outline-none"
                type="button"
              >
                <span className="material-icons p-3">
                  menu
                </span>
              </button>
            </li>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  };
};

const mapStateToProps = ({ auth, showMenu }) => {
  return { auth, showMenu };
};

export default connect(mapStateToProps, { addCredits, toggleMenu })(Header);