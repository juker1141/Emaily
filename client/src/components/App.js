import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import PaymentsAdd from './credits/PaymentsAdd';
import PaymentsSuccess from './credits/PaymentsSuccess';
import PaymentsCancel from './credits/PaymentsCancel';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  };

  render() {
    return (
      <div className="bg-primary overflow-x-hidden h-screen text-white font-Roboto">
        <BrowserRouter>
          <div className="container mx-auto relative">
            {/* BrowserRouter 內只能有一個元件 所以我們用一個 div 包起來 */}
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
            <Route exact path="/surveys/addcredits/success/session_id=:id" component={PaymentsAdd} />
            <Route exact path="/surveys/addcredits/success" component={PaymentsSuccess} />
            <Route exact path="/surveys/addcredits/cancel" component={PaymentsCancel} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);